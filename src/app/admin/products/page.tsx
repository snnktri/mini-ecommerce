"use server";

import React from "react";
import { fetchProducts } from "@/store/fetchProduct";
import AdminProductCard from "@/components/admin/AdminProductCard";
import AdminPaginate from "@/components/admin/AdminPagination";


interface PageProps {
  searchParams?: {
    page?: number;
  }
}

const Product = async ({searchParams}: PageProps) => {
  const currentPage = Number(searchParams?.page || 1);
  const { products } = await fetchProducts(currentPage);
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-50 to-cyan-50 py-10 px-4 sm:px-6 lg:px-12">
      <div className="w-full grid justify-center grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products?.data.map((product) => (
          <AdminProductCard key={product.id} product={product} />
        ))}
      </div>

     <AdminPaginate currentPage={currentPage}
     products={products}/>
    </div>
  );
};

export default Product;
