import type { Category, Product } from "@/types";
import { apiClient } from "./client";

export async function getCategories(): Promise<Category[]> {
  return apiClient<Category[]>("/categories");
}

export async function getCategory(id: number): Promise<Category> {
  return apiClient<Category>(`/categories/${id}`);
}

export async function getCategoryProducts(
  id: number,
): Promise<Product[]> {
  return apiClient<Product[]>(`/categories/${id}/products`);
}