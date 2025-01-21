"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// Defining the interface for the product type
interface IProduct {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  category: string;
  title: string;
  price: number;
}

const TrendingProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get("/api/get_products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="container mt-32 px-4 md:px-8">
      {/* Title and Filter Section */}
      <div className="sm:flex justify-between items-center">
        <h2 className="text-sm font-medium uppercase font-urbanist bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Trending Products
        </h2>
      </div>

      {/* Product Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {Array.isArray(products) &&
          products.map((item: IProduct) => (
            <ProductCard
              key={item._id}
              id={item._id}
              img={item.imgSrc}
              category={item.category}
              price={item.price}
              title={item.title}
              isLoading={false}
              delivery={""}
              availability={""}
              description={""}
            />
          ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
