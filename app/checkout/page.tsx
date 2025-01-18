"use client"
import CheckoutPage from '@/components/Frontend/CheckoutPage'
import convertToSubCurrency from '@/lib/convertsubcurrency'
import React from 'react'
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getURL } from 'next/dist/shared/lib/utils';
import { useSearchParams } from 'next/navigation';




const CheckoutUI = () => {

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
    }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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
  )
}

export default CheckoutUI
