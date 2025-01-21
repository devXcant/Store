"use client";
import Cart from "@/components/Frontend/Cart";
import Footer from "@/components/Frontend/Footer";
import LoginUI from "@/components/Frontend/Login";
// import Login, { LoginUI } from "@/components/Frontend/Login";
import Navbar from "@/components/Frontend/Navbar";
import React, { useState } from "react";

const page = () => {
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      <LoginUI />
      <Footer />
    </>
  );
};

export default page;
