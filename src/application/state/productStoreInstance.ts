import { createProductStore } from "./productStore";
import { HttpProductRepository } from "../../infrastructure/repositories/HttpProductRepository";
import { FetchProductBySlug } from "../usecases/fetchProductBySlug";

const repo = new HttpProductRepository();
const fetchProductBySlug = new FetchProductBySlug(repo);

export const useProductStore = createProductStore(fetchProductBySlug);
