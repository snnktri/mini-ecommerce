
import { Product, Products, ProductResponse } from "@/types/products.types";
import api from "../axios";

export const productApi = {

  getProducts: async (page?: number, limit?: number): Promise<ProductResponse<Products>> => {
    try {
      const url = `/randomproducts?page=${page ?? 1}&limit=${limit ?? 10}`;
      const response = await api.get<ProductResponse<Products>>(url);
      return response.data;
    } catch (error: any) {
      console.error(error.message || "Error fetching products");
      return { success: false, message: error.message || "Failed to fetch products" };
    }
  },

  getProductById: async (id: number): Promise<ProductResponse<Product>> => {
    try {
      const url = `/randomproducts/${id}`;
      const response = await api.get<ProductResponse<Product>>(url);
      return response.data;
    } catch (error: any) {
      console.error(error.message || "Error fetching product");
      return { success: false, message: error.message || "Failed to fetch product" };
    }
  },
};
