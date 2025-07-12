'use client'
import { OrderByUser } from "@/types/order";

export function getLocalOrderSummary() {
  try {
    const ordersJSON = localStorage.getItem("orders");
    if (!ordersJSON) return { totalOrders: 0, revenue: 0 };

    const orders = JSON.parse(ordersJSON) as OrderByUser;

    let totalOrders = 0;
    let revenue = 0;

    Object.values(orders).forEach((orderArray) => {
      totalOrders += orderArray.length;

      revenue += orderArray.reduce((sum, order) => {
        return sum + order.items.reduce((itemSum, item) => {
          return itemSum + item.price * item.quantity;
        }, 0);
      }, 0);
    });

    return { orders, totalOrders, revenue };
  } catch (err) {
    console.error("Failed to parse orders from localStorage", err);
    return { totalOrders: 0, revenue: 0 };
  }
}
