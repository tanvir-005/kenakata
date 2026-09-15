import type { Product } from "@/types";
import { apiClient } from "./client";

export interface GetProductsParams {
  offset?: number;
  limit?: number;
  title?: string;
  priceMin?: number;
  priceMax?: number;
  categoryId?: number;
}

export async function getProducts(
  params: GetProductsParams = {},
): Promise<Product[]> {
  const searchParams = new URLSearchParams();

  if (params.offset !== undefined) {
    searchParams.set("offset", String(params.offset));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.title) {
    searchParams.set("title", params.title);
  }

  if (params.priceMin !== undefined) {
    searchParams.set("price_min", String(params.priceMin));
  }

  if (params.priceMax !== undefined) {
    searchParams.set("price_max", String(params.priceMax));
  }

  if (params.categoryId !== undefined) {
    searchParams.set("categoryId", String(params.categoryId));
  }

  const query = searchParams.toString();

  return apiClient<Product[]>(
    `/products${query ? `?${query}` : ""}`,
  );
}

export async function getProduct(id: number): Promise<Product> {
  return apiClient<Product>(`/products/${id}`);
}

export async function getRelatedProducts(
  id: number,
): Promise<Product[]> {
  return apiClient<Product[]>(`/products/${id}/related`);
}