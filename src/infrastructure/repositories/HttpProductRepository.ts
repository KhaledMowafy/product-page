import { apiClient } from "../http/apiClient";
import type { Product, ProductImage, ProductVariant } from "../../domain/product";
import type { ProductRepository } from "../../domain/repositories/ProductRepository";


interface RawVariationProp {
  id: string;
  name?: string; 
  variation_id?: string;
  value?: string;

  variation?: string;       
  variation_prop?: string;  
  product_variant_id?: string;
}

interface RawVariation {
  id: string;
  name: string; 
  product_id: string;
  type: string; 
  props: RawVariationProp[];
}

interface RawVariant {
  id: string;
  product_id: string;
  price: number;
  sale_price: number;
  quantity: number;
  taager_code: string;
  variation_props: RawVariationProp[];
}

interface RawCategory {
  id: string;
  name: string;
  slug: string;
  thumb: string;
}

interface RawProduct {
  id: string;
  updated_at: string;
  created_at: string;
  store_id: string;
  name: string;
  price: number;
  sale_price: number;
  description: string;
  slug: string;
  thumb: string;
  images: string[];
  position: number;
  hidden: boolean;
  quantity: number;
  track_stock: boolean;
  disable_orders_for_no_stock: boolean;
  show_landing_in_same_page: boolean;
  buy_now_text: string;
  is_fixed_bottom_buy: boolean;
  is_one_page_checkout: boolean;
  fake_visitors_min: number;
  fake_visitors_max: number;
  fake_timer_hours: number;
  is_quantity_hidden: boolean;
  is_header_hidden: boolean;
  is_free_shipping: boolean;
  custom_currency: string;
  is_checkout_before_description: boolean;
  hide_related_products: boolean;
  is_taager_submit_active: boolean;
  is_ecombo_submit_active: boolean;
  is_mosaweq_submit_active: boolean;
  is_alturky_submit_active: boolean;
  is_jamaica_submit_active: boolean;
  is_engzny_submit_active: boolean;
  is_digital: boolean;
  is_cloaking_active: boolean;

  variations?: RawVariation[];
  variants?: RawVariant[];
  categories?: RawCategory[];

}


export class HttpProductRepository implements ProductRepository {
  async getBySlug(slug: string): Promise<Product> {
    const url = `/products/slug/clear-theme/${slug}?join=reviews`;
    const { data } = await apiClient.get<RawProduct>(url);

    const raw: RawProduct = data;

    const images: ProductImage[] = [
      {
        id: "thumb",
        url: raw.thumb,
        alt: raw.name,
      },
      ...raw.images.map((url, index): ProductImage => ({
        id: `img-${index}`,
        url,
        alt: raw.name,
      })),
    ];

    const categories: string[] = (raw.categories ?? []).map(
      (category) => category.name
    );

    const variants: ProductVariant[] = (raw.variants ?? []).map(
      (variant): ProductVariant => {
        const attributes: Record<string, string> = {};

        variant.variation_props.forEach((vp) => {
          if (vp.variation && vp.variation_prop) {
            attributes[vp.variation] = vp.variation_prop;
          }
        });

        const inStock = variant.quantity > 0;
        const salePrice =
          variant.sale_price && variant.sale_price > 0
            ? variant.sale_price
            : undefined;

        return {
          id: variant.id,
          sku: variant.taager_code,
          price: variant.price,
          salePrice,
          inStock,
          stockQty: variant.quantity,
          attributes,
        };
      }
    );

    const salePrice =
      raw.sale_price && raw.sale_price > 0 ? raw.sale_price : undefined;

    const product: Product = {
      id: raw.id,
      slug: raw.slug,
      name: raw.name,
      description: raw.description,
      price: raw.price,
      salePrice,
      images,
      categories,
      tags: [],       
      variants,
      reviews: [],    
    };

    return product;
  }
}
