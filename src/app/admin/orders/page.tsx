"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderByUser } from "@/types/order";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

const Order = () => {
  const [ordersByCustomer, setOrdersByCustomer] = useState<OrderByUser>({});

  useEffect(() => {
    try {
      const ordersJSON = localStorage.getItem("orders");
      if (ordersJSON) {
        const parsedOrders = JSON.parse(ordersJSON) as OrderByUser;
        setOrdersByCustomer(parsedOrders);
      }
    } catch (error) {
      console.error("Error parsing orders from localStorage:", error);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {Object.entries(ordersByCustomer).length === 0 && (
        <p className="text-center text-red-500">No orders found.</p>
      )}

      {Object.entries(ordersByCustomer).map(([_, orders]) =>
        orders.map((order) => (
          <Card
            key={order.id}
            className="p-6 bg-white shadow-md rounded-lg space-y-4"
          >
            <h2 className="text-xl font-semibold capitalize">{order?.name}</h2>

            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {order.email || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {order.address || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Order Date:</span>{" "}
                {formatDate(order.date)}
              </p>
            </div>

            {/* Table from ShadCN */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="flex items-center gap-3">
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 text-right font-semibold text-lg">
              Order Total: $
              {order.items
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default Order;
