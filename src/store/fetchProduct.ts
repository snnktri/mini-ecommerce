import { productApi } from "@/lib/api/product-api";
import { Products } from "@/types/products.types";

export async function fetchProducts(currentPage: number = 1) {
  const data = await productApi.getProducts(currentPage);
  return {
    products: data?.data as Products || [],
    totalProducts: data?.data?.totalItems || 0,
  };
}