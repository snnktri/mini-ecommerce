"use client";

import { useCartStore } from "@/store/useCart";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { 
  ShoppingCartIcon, 
  TrashIcon, 
  MinusIcon, 
  PlusIcon,
  ShoppingBagIcon,
  ArrowLeftIcon
} from "lucide-react";

const Cart = () => {
  const router = useRouter();
  const { items, removeFromCart, updateCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    updateCart(id, quantity);
  };

  const handleIncrement = (id: number, currentQuantity: number) => {
    updateCart(id, currentQuantity + 1);
  };

  const handleDecrement = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateCart(id, currentQuantity - 1);
    }
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedShipping = totalPrice > 100 ? 0 : 9.99;
  const finalTotal = totalPrice + estimatedShipping;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <ShoppingCartIcon className="w-16 h-16 text-gray-400" />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-dashed border-gray-300 rounded-full animate-pulse" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="text-gray-600 text-lg">Looks like you haven't added anything to your cart yet.</p>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg px-8 py-3"
            onClick={() => router.push("/")}
          >
            <ShoppingBagIcon className="w-5 h-5 mr-2" />
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 hover:bg-white/50"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Continue Shopping
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <TableHead className="pl-8 py-6 text-left font-semibold text-gray-900">Product</TableHead>
                    <TableHead className="text-center font-semibold text-gray-900">Price</TableHead>
                    <TableHead className="text-center font-semibold text-gray-900">Quantity</TableHead>
                    <TableHead className="text-center font-semibold text-gray-900">Total</TableHead>
                    <TableHead className="pr-8 text-right font-semibold text-gray-900">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map(({ id, title, price, quantity, thumbnail }) => (
                    <TableRow
                      key={id}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200"
                    >
                      <TableCell className="pl-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative overflow-hidden rounded-xl border border-gray-200">
                            <img
                              src={thumbnail}
                              alt={title}
                              className="h-20 w-20 object-cover transition-transform duration-200 hover:scale-110"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
                            <p className="text-gray-500 text-sm">Premium Quality</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-xl text-gray-900">${price.toFixed(2)}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full hover:bg-gray-100"
                            onClick={() => handleDecrement(id, quantity)}
                          >
                            <MinusIcon className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => handleQuantityChange(id, Number(e.target.value))}
                            className="w-16 text-center border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full hover:bg-gray-100"
                            onClick={() => handleIncrement(id, quantity)}
                          >
                            <PlusIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-xl text-green-600">${(price * quantity).toFixed(2)}</span>
                      </TableCell>
                      <TableCell className="pr-8 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2"
                          onClick={() => removeFromCart(id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {items.map(({ id, title, price, quantity, thumbnail }) => (
                <div
                  key={id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex gap-4 mb-4">
                    <div className="relative overflow-hidden rounded-xl border border-gray-200">
                      <img
                        src={thumbnail}
                        alt={title}
                        className="h-24 w-24 object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{title}</h3>
                      <p className="text-gray-500 text-sm mb-2">Premium Quality</p>
                      <p className="font-bold text-xl text-gray-900">${price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 rounded-full"
                        onClick={() => handleDecrement(id, quantity)}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 rounded-full"
                        onClick={() => handleIncrement(id, quantity)}
                      >
                        <PlusIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeFromCart(id)}
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="font-semibold text-gray-700">Subtotal:</span>
                    <span className="font-bold text-xl text-green-600">${(price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-96">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-black text-gray-900">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                disabled={items.length === 0 || isProcessing}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg mb-4"
                onClick={handlePlaceOrder}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <ShoppingBagIcon className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </Button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;