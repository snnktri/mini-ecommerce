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
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCart";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleClick = (product: Product) => {
    addToCart(product);
  };

  const productRating = product.rating ?? 0;
  const discount = product.discountPercentage ?? 0;
  const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);
  const imageUrl = product.thumbnail || product.images?.[0] || "/product.jpg";

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300 border rounded-2xl overflow-hidden">
      {/* clickabele card expect button */}
      <Link
        href={`/product/${product.id}`}
        className="flex-grow block cursor-pointer"
        aria-label={`View details for ${product.title}`}
      >
        {/* image*/}
        <div className="relative w-full h-48 bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
        </div>

        {/* Title  of the poruct*/}
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-base font-semibold text-gray-800 truncate hover:underline">
            {product.title}
          </CardTitle>
        </CardHeader>

        {/* Main content */}
        <CardContent className="flex flex-col justify-between px-4 flex-1 text-sm text-gray-600">
          <p className="line-clamp-2">{product.description}</p>

          <div className="mt-3 flex justify-between items-center">
            {/* Ratings */}
            <span className="flex items-center text-sm text-yellow-500 font-medium">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
              {productRating.toFixed(1)}
            </span>

            {/* Price */}
            <div className="text-right">
              {discount > 0 && (
                <span className="block text-sm text-gray-400 line-through">
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

      {/* Add to cart button */}
      <CardFooter className="mt-auto px-4 pb-4 pt-2">
        <Button
          className="w-full bg-gray-800 hover:bg-gray-900 text-white text-sm"
          onClick={() => handleClick(product)}
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Cart <ShoppingCart className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
