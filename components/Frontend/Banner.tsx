"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// Define the interface for the product type
interface IProduct {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  category: string;
  title: string;
  price: number;
}

const Banners = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get("/api/get_banner_products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching banner products:", error));
  }, []);

  return (
    <div className="container mt-16 px-4 md:px-8">
      <h2 className="text-sm font-medium uppercase font-urbanist bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Banners</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {products.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            img={item.imgSrc}
            category={item.category}
            price={item.price}
            title={item.title}
            isLoading={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Banners;
