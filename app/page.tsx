"use client";
import Cart from "@/components/Frontend/Cart";
import Hero from "@/components/Frontend/Hero";
import Navbar from "@/components/Frontend/Navbar";
import TrendingProucts from "@/components/Frontend/TrendingProucts";

import { useState } from "react";



export default function Home() {

  const [showCart, setShowCart] = useState(false);
  return (
    <main>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      <Hero />
      <TrendingProucts />
    </main>
  );
}
