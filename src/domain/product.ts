export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  salePrice?: number | null;
  inStock: boolean;
  stockQty?: number | null;

  attributes: Record<string, string>;
}

export interface ProductReview {
  id: string;
  rating: number;
  title: string;
  comment: string;
  authorName: string;
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number | null;
  images: ProductImage[];
  categories: string[];
  tags: string[];
  variants: ProductVariant[];
  reviews: ProductReview[];
}
