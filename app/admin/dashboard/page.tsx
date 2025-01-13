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
    <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
      <h2 className="text-3xl font-semibold mb-4">All Products</h2>
      <button
        onClick={postProducts}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
      >
        Post Products
      </button>

      <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-gray-500 border-t border-[#ececec]">
              <th className="py-2 px-4">SR NO.</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Picture</th>
              <th className="py-2 px-4">Actions</th>
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

      {openPopup && (
        <Popup setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable} />
      )}
    </div>
  );
};

export default Dashboard;
