// src/application/usecases/fetchProductBySlug.ts
import type { ProductRepository } from "../../domain/repositories/ProductRepository";
import type { Product } from "../../domain/product";

export class FetchProductBySlug {
  private repo: ProductRepository;
  constructor(repo: ProductRepository) {
    this.repo = repo;
  }

  async execute(slug: string): Promise<Product> {
    return this.repo.getBySlug(slug);
  }
}
