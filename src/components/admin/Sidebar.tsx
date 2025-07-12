"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className="w-30 sm:w-40 md:w-50 bg-gray-200 left-0 min-h-screen border-r border-gray-700">
      <div className="space-y-4 p-4 w-full">
        <h1 className="text-gray-800 font-semibold text-2xl">Admin Panel</h1>
        <nav className="w-full space-y-4 flex flex-col items-center">
          <Link
            href="/admin"
            className={`text-white w-full flex t py-1.5 justify-center items-center rounded-md
      hover:scale-105 transition-transform duration-200 ${
        pathName === "/admin" ? "bg-gray-800" : "bg-gray-700"
      }`}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className={`text-white w-full flex justify-center items-center py-1.5 rounded-md
      hover:scale-105 transition-transform duration-200 ${
        pathName === "/admin/products" ? "bg-gray-800" : "bg-gray-700"
      }`}
          >
            Product
          </Link>
          <Link
            href="/admin/orders"
            className={`text-white w-full flex justify-center items-center py-1.5 rounded-md
      hover:scale-105 transition-transform duration-200 ${
        pathName === "/admin/orders" ? "bg-gray-800" : "bg-gray-700"
      }`}
          >
            Orders
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
