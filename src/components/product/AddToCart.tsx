"use client";

import { Product } from '@/types/products.types';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCart';

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addToCart } = useCartStore();

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <Button
      onClick={handleAdd}
      size="lg"
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
