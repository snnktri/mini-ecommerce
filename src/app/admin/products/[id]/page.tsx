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
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, PercentIcon, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    id: string;
  };
}

const AdminProductById = async ({ params }: Props) => {
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

    // You can replace these with real handlers or navigation later
    const handleEdit = () => {
      console.log("Edit product", product.id);
      // e.g. router.push(`/admin/products/edit/${product.id}`)
    };
    const handleDelete = () => {
      console.log("Delete product", product.id);
      // e.g. open confirmation modal then call delete API
    };

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <Card className="flex flex-col md:flex-row gap-10 p-8 shadow-lg rounded-3xl bg-white border">
            {/* Image */}
            <section className="md:w-1/2 w-full relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md">
              <Image
                src={product.thumbnail || "/product.jpg"}
                alt={product.title}
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {discount}% OFF
                </div>
              )}
            </section>

            {/* Info */}
            <section className="md:w-1/2 w-full flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 mb-4">
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className="text-xs font-medium">
                      {product.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {product.brand}
                    </Badge>
                  </div>
                  <CardTitle className="text-4xl font-bold mb-2">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-gray-700 font-medium leading-relaxed">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <div className="flex flex-wrap gap-4 items-center mb-8">
                  <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-full border border-yellow-300">
                    <StarIcon className="w-5 h-5 text-yellow-600 fill-current" />
                    <span className="font-semibold text-yellow-800">
                      {rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-full border border-green-300">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    <span className="font-semibold text-green-800">
                      {product.stock} in stock
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-extrabold text-green-700">
                      ${discountedPrice}
                    </span>
                    {discount > 0 && (
                      <span className="text-xl line-through text-gray-400 font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                      <PercentIcon className="w-5 h-5" />
                      <span>You save ${savings}!</span>
                    </div>
                  )}
                </div>
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

export default AdminProductById;
