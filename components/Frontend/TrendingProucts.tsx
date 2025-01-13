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
  // Initialize 'products' as an empty array
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get("/api/get_products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);  // Set the fetched data to the state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="container mt-32">
      <div className="sm:flex justify-between items-center">
        <h2 className="text-4xl font-medium">Trending Products</h2>
        <div className="text-gray-500 flex gap-4 text-xl mt-4 sm:mt-0">
          <div className="text-black">New</div>
          <div>Featured</div>
          <div>Top sellers</div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {/* Iterate over products only if the data is an array */}
        {Array.isArray(products) && products.map((item: IProduct) => (
          <ProductCard
            key={item._id}
            id={item._id}
            img={item.imgSrc}
            category={item.category}
            price={item.price}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
