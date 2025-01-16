"use client"
import CheckoutPage from '@/components/Frontend/CheckoutPage'
import convertToSubCurrency from '@/lib/convertsubcurrency'
import React from 'react'
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";




const CheckoutUI = () => {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    // const amount = 49.99;
    const amount = 49.99;
  return (
    <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubCurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
  )
}

export default CheckoutUI
