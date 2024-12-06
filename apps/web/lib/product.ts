import {
  CreateProductDto,
  SearchProductsDto,
} from "@ebay-clone/nestjs-libs/dtos";
import { authFetch } from "./auth-fetch";
import { BACKEND_URL } from "./constants";
import { SelectProduct } from "@ebay-clone/nestjs-libs/db/schema";

const baseUrl = `${BACKEND_URL}/products`;

export type SearchableProduct = SelectProduct & {
  seller : {
    email: string, 
    profileImageUrl: string, 
    userId: number,
    username: string
  }
}

export async function searchProducts(
  page: number,
  limit: number,
  dto: SearchProductsDto
) {
  console.log(dto);
  const res = await authFetch<SearchableProduct[]>(
    `${baseUrl}/search-products?page=${page}&limit=${limit}`,
    {
      method: "POST",
      body: JSON.stringify(dto),
    }
  );
  return res;
}

export async function createProduct(dto: CreateProductDto) {
  const res = await authFetch(`${baseUrl}`, {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export async function getProducts(page: number, limit: number) {
  const url = `${baseUrl}?page=${page}&limit=${limit}`;
  const res = await authFetch<SearchableProduct[]>(url, {
    method: "GET",
  });
  return res;
}
