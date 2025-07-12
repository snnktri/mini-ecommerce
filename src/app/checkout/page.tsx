"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckOuSchema, SignupForm } from "@/lib/validators/logingValidation";
import { useCartStore } from "@/store/useCart";

const CheckOut = () => {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  console.log(items);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(CheckOuSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    console.log("Checkout data", data.fName);

    const ordersJSON = localStorage.getItem("orders");
    const orders = ordersJSON ? JSON.parse(ordersJSON) : {};
    console.log(data.fName)

    const firstName = (data.fName || "").split(" ")[0];
    if (!orders[firstName]) {
      orders[firstName] = [];
    }

    orders[firstName].push({
      id: Date.now(),
      items,
      name: data.fName,
      email: data.email,
      address: data.address,
      date: new Date().toISOString(),
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    clearCart();

    router.push("/success");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="text-sm text-gray-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Ram Sharma"
              {...register("fName")}
              aria-invalid={errors.fName ? "true" : "false"}
            />
            {errors.fName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.fName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ram@gmail.com"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="address" className="text-sm text-gray-700">
              Address
            </Label>
            <Input
              id="address"
              placeholder="Kathmandu 21, Kotehswor"
              {...register("address")}
              aria-invalid={errors.address ? "true" : "false"}
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-800 text-white hover:bg-gray-900"
            disabled={isSubmitting}
          >
            Place Order
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CheckOut;
