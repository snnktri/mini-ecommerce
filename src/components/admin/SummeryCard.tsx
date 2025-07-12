"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getLocalOrderSummary } from "@/store/fetchOrder";

export default function SummaryCards({ totalProducts }: { totalProducts?: number }) {
   const [totalOrders, setTotalOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const { totalOrders, revenue } = getLocalOrderSummary();
    setTotalOrders(totalOrders);
    setRevenue(revenue);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3 m-4">
      <Card className="shadow-sm border border-blue-200 hover:bg-gray-100 hover:scale-105 transition-transform">
        <CardHeader>
          <CardTitle>Total Products</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-blue-600">
          {totalProducts}
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-green-200 hover:bg-gray-100 hover:scale-105 transition-transform">
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-green-600">
          {totalOrders}
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-yellow-200 hover:bg-gray-100 hover:scale-105 transition-transform">
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-yellow-600">
          ${revenue}
        </CardContent>
      </Card>
    </div>
  );
}
