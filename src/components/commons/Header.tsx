"use client"
import { useCartStore } from "@/store/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const items = useCartStore((state) => state.items);
  const totalItem = items.reduce((total, item) => total + item.quantity, 0)
  return (
    <header className="w-full bg-gray-700 text-white py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* logo  */}
        <div><Link href="/">Home</Link></div>
        {/* navbar */}
        <nav className="">
            <Link href="/admin">Admin Dashboard</Link>
        </nav>
        {/* cart and login admin */}
        <div className="flex gap-x-4">
          {/* login */}
          {/* cart */}
          <Link href="/cart" className="relative inline-block">
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-3 -right-3 bg-red-500 rounded-full text-xs text-white w-5 h-5 flex items-center justify-center">
              {totalItem}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
