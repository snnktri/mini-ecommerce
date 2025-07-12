"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, LoginSchema } from "@/lib/validators/logingValidation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    console.log("Login data", data);
    try {
    const res =  await axios.post("/api/login", data);
    if(res.status === 200) {
      console.log(res)
      alert("Login successfull.")
      route.push('/admin');
    }
      
    } catch (error: any) {
      alert(error?.message || "Something went wrong during login.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="space-y-6 bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-center text-2xl text-gray-700 font-semibold">Admin Login</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your credentials to login to the admin panel
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm text-gray-600">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="admin@demo.com"
              className="border w-full p-2 mt-1"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Label htmlFor="password" className="text-sm text-gray-600">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••"
              className="border w-full p-2 mt-1 pr-10"
              autoComplete="current-password"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full bg-gray-800 cursor-pointer">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
