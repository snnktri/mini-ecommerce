import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const Success = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl p-10 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
        <p>
        <Link href="/" className="green-500">Continue shopping!!</Link>
        </p>
      </div>
    </div>
  );
};

export default Success;
