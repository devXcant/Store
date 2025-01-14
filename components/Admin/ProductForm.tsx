"use client";

import { useAppDispatch } from "@/lib/hook";
import { setLoading } from "@/redux/features/loadingReducer";
import { makeToast } from "@/utils/helper";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

interface IPayload {
  imgSrc: null | string;
  fileKey: null | string;
  name: string;
  category: string;
  price: string;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    imgSrc: null,
    fileKey: null,
    name: "",
    category: "",
    price: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    axios
      .post("http://localhost:3000/api/add_products", payload)
      .then((res) => {
        makeToast("Product added successfully");
        setPayload({
          imgSrc: null,
          fileKey: null,
          name: "",
          category: "",
          price: "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <form
      className="flex flex-col gap-6 bg-black border border-white rounded-xl bg-opacity-30 backdrop-blur-lg p-6  shadow-lg max-w-xl mx-auto font-urbanist"
      onSubmit={handleSubmit}
    >
      {/* Image Preview */}
      <Image
        src={payload.imgSrc ? payload.imgSrc : "/placeholder.jpg"}
        width={800}
        height={500}
        alt="Preview"
        className="max-h-[300px] w-full object-cover rounded-md shadow-md"
      />

      {/* Upload Button */}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setPayload({
            ...payload,
            imgSrc: res[0]?.url,
            fileKey: res[0]?.url,
          });
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      {/* Product Name */}
      <div>
        <label
          htmlFor="product-name"
          className="block text-gray-200 text-sm font-medium mb-1"
        >
          Product Name
        </label>
        <input
          id="product-name"
          type="text"
          className="w-full px-4 py-2 text-black rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
      </div>

      {/* Product Category */}
      <div>
        <label
          htmlFor="product-category"
          className="block text-gray-200 text-sm font-medium mb-1"
        >
          Product Category
        </label>
        <input
          id="product-category"
          type="text"
          className="w-full px-4 py-2 text-black rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={payload.category}
          onChange={(e) =>
            setPayload({ ...payload, category: e.target.value })
          }
          required
        />
      </div>

      {/* Product Price */}
      <div>
        <label
          htmlFor="product-price"
          className="block text-gray-200 text-sm font-medium mb-1"
        >
          Product Price
        </label>
        <input
          id="product-price"
          type="text"
          className="w-full px-4 py-2 text-black rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={payload.price}
          onChange={(e) => setPayload({ ...payload, price: e.target.value })}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 text-white bg-gradient-to-r from-green-500 to-green-700 rounded-lg hover:shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300"
        >
          + Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
