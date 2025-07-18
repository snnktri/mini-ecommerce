"use server";

import { productApi } from "@/lib/api/product-api";
import ProductCard from "@/components/product/ProductCard";
import React from "react";
import PagenatePage from "@/components/product/PagenatePage";
import { fetchProducts } from "@/store/fetchProduct";


interface PageProps {
  searchParams?: {
    page?: number;
  }
}

const page = async ({searchParams}: PageProps) => {
  const currentPage = Number(searchParams?.page || 1);
  const { products } = await fetchProducts(currentPage);
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-50 to-cyan-50 py-10 px-4 sm:px-6 lg:px-12">
      <div className="w-full grid justify-center grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products?.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

     <PagenatePage currentPage={currentPage}
     products={products}/>
    </div>
  );
};

export default page;
