"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { Product } from "@/types/products.types";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const AdminProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productRating = product.rating ?? 0;
  const discount = product.discountPercentage ?? 0;
  const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);
  const imageUrl = product.thumbnail || product.images?.[0] || "/product.jpg";

  return (
    <Card className="flex flex-col h-full shadow-sm border rounded-2xl overflow-hidden">
      <Link
        href={`/admin/products/${product.id}`}
        className="flex-grow block"
        aria-label={`View details for ${product.title}`}
      >
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
        </div>

        {/* Title */}
        <CardHeader className="pb-1 pt-3 px-4">
          <CardTitle className="text-base font-semibold text-gray-800 truncate">
            {product.title}
          </CardTitle>
        </CardHeader>

        {/* Info */}
        <CardContent className="px-4 text-sm text-gray-600 space-y-1">
          <p className="line-clamp-2">{product.description}</p>

          <div className="flex justify-between items-center text-sm mt-2">
            <div className="flex items-center text-yellow-500 font-medium">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
              {productRating.toFixed(1)}
            </div>

            <div className="text-right">
              {discount > 0 && (
                <span className="block text-xs text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
              <span className="text-base font-semibold text-green-600">
                ${discountedPrice}
              </span>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="mt-auto px-4 pb-4 pt-2 flex flex-col gap-4">
        <Button variant="outline" size="sm" className="w-full text-sm bg-gray-700 text-white">
          Edit
        </Button>
        <Button variant="destructive" size="sm" className="w-full text-sm bg-red-500 text-white">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProductCard;
