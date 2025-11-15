// src/infrastructure/repositories/HttpProductRepository.ts
import type { ProductRepository } from "../../domain/repositories/ProductRepository";
import type { Product } from "../../domain/product";
import { apiClient } from "../http/apiClient";

export class HttpProductRepository implements ProductRepository {
  async getBySlug(slug: string): Promise<Product> {
    // For now slug is fixed by the task – later make it dynamic.
    const url = `/products/slug/clear-theme/${slug}?join=reviews`;
    const { data } = await apiClient.get(url);

    const raw = data?.data ?? data; 

    const product: Product = {
      id: String(raw.id),
      slug: raw.slug,
      name: raw.name,
      description: raw.description,
      price: raw.price,
      salePrice: raw.sale_price,
      images: raw.images.map((img: any) => ({
        id: String(img.id),
        url: img.url,
        alt: img.alt,
      })),
      categories: raw.categories?.map((c: any) => c.name) ?? [],
      tags: raw.tags ?? [],
      variants:
        raw.variants?.map((v: any) => ({
          id: String(v.id),
          sku: v.sku,
          price: v.price,
          salePrice: v.sale_price,
          inStock: v.in_stock,
          stockQty: v.stock_qty,
          attributes: v.attributes, 
        })) ?? [],
      reviews:
        raw.reviews?.map((r: any) => ({
          id: String(r.id),
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          authorName: r.customer_name,
          createdAt: r.created_at,
        })) ?? [],
    };

    return product;
  }
}
