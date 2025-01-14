import ProductForm from "@/components/Admin/ProductForm";
import React from "react";

const Products = () => {
  return (
    <div className="h-[calc(100vh-96px)] w-full grid place-items-center overflow-y-auto bg-black">
      <div className="bg-black bg-opacity-70 w-full max-w-lg rounded-lg p-8 shadow-2xl">
        <ProductForm />
      </div>
    </div>
  );
};

export default Products;
