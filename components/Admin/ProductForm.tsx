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
        makeToast("Product added Successfully");
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        src={payload.imgSrc ? payload.imgSrc : "/placeholder.jpg"}
        width={800}
        height={500}
        alt="any"
        className="max-h-[300px] w-auto object-contain rounded-md"
      />

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setPayload({
            ...payload,
            imgSrc: res[0]?.url,
            fileKey: res[0]?.url,
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      <div>
        <label htmlFor="product-name" className="block ml-1">
          Product Name
        </label>
        <input
          id="product-name"
          type="text"
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="product-name" className="block ml-1">
          Product Category
        </label>
        <input
          id="product-name"
          type="text"
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="product-name" className="block ml-1">
          Product Price
        </label>
        <input
          id="product-name"
          type="text"
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          value={payload.price}
          onChange={(e) => setPayload({ ...payload, price: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-pink text-white px-8 py-2 rounded-lg">
          +Products
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
