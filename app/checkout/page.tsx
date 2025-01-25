"use client";

import CheckoutPage from "@/components/Frontend/CheckoutPage";
import convertToSubCurrency from "@/lib/convertsubcurrency";
import React, { Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

const CheckoutWrapper = () => {
  const searchParams = useSearchParams();
  const totalAmount = parseFloat(searchParams.get("totalAmount") || "0");

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubCurrency(totalAmount),
        currency: "usd",
      }}
    >
      <CheckoutPage amount={totalAmount} />
    </Elements>
  );
};

const CheckoutUI = () => {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutWrapper />
    </Suspense>
  );
};

export default CheckoutUI;
