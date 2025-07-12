
import { notFound } from "next/navigation";
import type { Product } from "@/types/products.types";
import React from "react";
import Image from "next/image";
import { productApi } from "@/lib/api/product-api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, PercentIcon } from "lucide-react";
import AddToCartButton from "@/components/product/AddToCart";

interface Props {
  params: {
    id: string;
  };
}

const ProductById = async ({ params }: Props) => {
  const { id } = params;
  if (!id) notFound();
  try {
    const res = await productApi.getProductById(+id);
    const product = res.data as Product | undefined;
    if (!product) notFound();
    const discount = product.discountPercentage ?? 0;
    const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);
    const rating = product.rating ?? 0;
    const savings = (product.price - parseFloat(discountedPrice)).toFixed(2);
    
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Card className="flex flex-col md:flex-row gap-12 p-8 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm border-0 relative overflow-hidden">
        
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
            
          
            <section className="md:w-1/2 w-full relative">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200/50 bg-white shadow-lg group">
                <Image
                  src={product.thumbnail || "/product.jpg"}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    {discount}% OFF
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </section>
            
           
            <section className="md:w-1/2 w-full flex flex-col justify-between gap-8 relative z-10">
              <div className="space-y-6">
                <CardHeader className="p-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs font-medium">
                      {product.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {product.brand}
                    </Badge>
                  </div>
                  <CardTitle className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed text-lg font-medium">
                    {product.description}
                  </CardDescription>
                </CardHeader>

               
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-full border border-yellow-200">
                    <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-yellow-800">{rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-semibold text-green-800">{product.stock} in stock</span>
                  </div>
                </div>

                
                <div className="space-y-3">
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black text-green-600">${discountedPrice}</span>
                    {discount > 0 && (
                      <span className="text-2xl line-through text-gray-400 font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <PercentIcon className="w-4 h-4" />
                      <span>You save ${savings}!</span>
                    </div>
                  )}
                </div>

              </div>

              {/* add to cart */}
              <div className="pt-6 border-t border-gray-200/50">
                <AddToCartButton product={product} />
              </div>
            </section>
          </Card>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }
};

export default ProductById;