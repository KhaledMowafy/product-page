import type { Product } from "../product";

export interface ProductRepository {
  getBySlug(slug: string): Promise<Product>;
}
