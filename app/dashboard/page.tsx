"use client";
import Advertisements from "@/components/Frontend/Advertisements";
import Banners from "@/components/Frontend/Banner";
import Cart from "@/components/Frontend/Cart";
import Footer from "@/components/Frontend/Footer";
import Hero from "@/components/Frontend/Hero";
import LoginUI from "@/components/Frontend/Login";
import Navbar from "@/components/Frontend/Navbar";
import NewArrivals from "@/components/Frontend/NewArrivals";
import TrendingProucts from "@/components/Frontend/TrendingProucts";
import { useState } from "react";

const page = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <main>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      <Banners />
      <TrendingProucts />
      <Footer />
    </main>
  );
};

export default page;
