"use client";
import Popup from "@/components/Admin/Popup";
import ProductRow from "@/components/Admin/ProductRow";
import { useAppDispatch } from "@/lib/hook";
import { setLoading } from "@/redux/features/loadingReducer";
import axios from "axios";
import React, { useEffect, useState } from "react";

export interface IProduct {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  price: string;
  category: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get("http://localhost:3000/api/get_products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => dispatch(setLoading(false)));
  }, [updateTable]);

  async function postProducts() {
    const products = [
      {
        srNo: 1,
        category: "Electronics",
        fileKey: "fileKey1",
        name: "Smartphone",
        picture: "smartphone.jpg",
        price: 699.99,
      },
      {
        srNo: 2,
        category: "Clothing",
        fileKey: "fileKey2",
        name: "T-Shirt",
        picture: "tshirt.jpg",
        price: 19.99,
      },
      {
        srNo: 3,
        category: "Books",
        fileKey: "fileKey3",
        name: "Programming Book",
        picture: "book.jpg",
        price: 29.99,
      },
      {
        srNo: 4,
        category: "Toys",
        fileKey: "fileKey4",
        name: "Action Figure",
        picture: "figure.jpg",
        price: 14.99,
      },
      {
        srNo: 5,
        category: "Home Appliances",
        fileKey: "fileKey5",
        name: "Vacuum Cleaner",
        picture: "vacuum.jpg",
        price: 149.99,
      },
    ];

    try {
      const response = await fetch("http://localhost:3000/api/post_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error posting products:", error);
    }
  }

  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-md h-[calc(100vh-96px)] rounded-lg p-6 shadow-lg">
      <h2 className="text-3xl font-semibold text-white mb-6">All Products</h2>
      <button
        onClick={postProducts}
        className=" bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg mb-4 hover:bg-green-700 transition-all"
      >
        Post Products
      </button>

      <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
        <table className="w-full table-auto border-collapse text-white">
          <thead>
            <tr className="text-gray-500 border-t border-[#ececec] bg-[#121212]">
              <th className="py-4 px-6">SR NO.</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Picture</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductRow
                key={product._id}
                srNo={index + 1}
                setOpenPopup={setOpenPopup}
                setUpdateTable={setUpdateTable}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* {openPopup && (
        <Popup setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable} />
      )} */}
    </div>
  );
};

export default Dashboard;
