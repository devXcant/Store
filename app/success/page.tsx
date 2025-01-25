"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";

const PaymentSuccessWrapper = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black font-urbanist">
      <div className="bg-black text-white p-6 rounded-xl shadow-lg w-[90%] max-w-xl">
        {/* Success Icon */}
        <div className="flex justify-center items-center mb-6">
          <AiOutlineCheckCircle className="text-green-400 text-6xl" />
        </div>

        {/* Success Message */}
        <h1 className="text-green-400 text-3xl font-bold text-center mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-300 text-center text-lg mb-4">
          Thank you for your purchase! Your payment of{" "}
          <span className="text-white font-bold">${amount}</span> has been
          successfully processed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            href="/"
            className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-3 rounded-md text-center font-bold text-white hover:from-purple-500 hover:to-purple-700 transition-all duration-300"
          >
            Go to Homepage
          </Link>
          <Link
            href="/orders"
            className="bg-gray-200 px-6 py-3 rounded-md text-center font-bold text-black hover:bg-gray-300 transition-all duration-300"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccess = () => {
  return (
    <Suspense fallback={<div className="text-white text-center mt-8">Loading...</div>}>
      <PaymentSuccessWrapper />
    </Suspense>
  );
};

export default PaymentSuccess;
