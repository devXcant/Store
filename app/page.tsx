"use client";
import Cart from "@/components/Frontend/Cart";
import Hero from "@/components/Frontend/Hero";
import Navbar from "@/components/Frontend/Navbar";
import TrendingProucts from "@/components/Frontend/TrendingProucts";
import Image from "next/image";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import convertToSubCurrency from "@/lib/convertsubcurrency";
import CheckoutPage from "@/components/Frontend/CheckoutPage";

export default function Home() {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const amount = 49.99;

  const [showCart, setShowCart] = useState(false);
  return (
    <main>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      <Hero />
      <TrendingProucts />


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
    </main>
  );
}
