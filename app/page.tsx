"use client";
import Advertisements from "@/components/Frontend/Advertisements";
import Banners from "@/components/Frontend/Banner";
import Cart from "@/components/Frontend/Cart";
import Hero from "@/components/Frontend/Hero";
import Navbar from "@/components/Frontend/Navbar";
import NewArrivals from "@/components/Frontend/NewArrivals";
import TrendingProucts from "@/components/Frontend/TrendingProucts";

import { useState } from "react";



export default function Home() {

  const [showCart, setShowCart] = useState(false);
  return (
    <main>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      {/* <Hero /> */}
      <Advertisements />
      <Banners />
      <NewArrivals />
      <TrendingProucts />
    </main>
  );
}
