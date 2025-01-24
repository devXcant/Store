"use client";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
import { setLoading } from "@/redux/features/loadingReducer";
import ProductRow from "@/components/Admin/ProductRow";
import axios from "axios";

export interface IProduct {
  _id: any;
  name: string;
  price: number;
  category: string;
  imgSrc: string;
  fileKey: string;
}

interface ImageType {
  id: string;
  urls: {
    small: string;
  };
}

const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categoryImages, setCategoryImages] = useState<
    Record<string, string[]>
  >({});
  const [updateTable, setUpdateTable] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    // Fetch existing products
    axios
      .get("/api/get_products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => dispatch(setLoading(false)));
  }, [updateTable]);

  useEffect(() => {
    // Fetch Unsplash images for each category
    async function fetchImages() {
      const categories = [
        "Electronics",
        "Clothing",
        "Books",
        "Toys",
        "Home Appliances",
      ];
      const fetchedImages: Record<string, string[]> = {};

      try {
        await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?query=${category}&per_page=5&client_id=L204sknrX9m9qW--qR-E3Kxl8t8YJ19LctCCDYQ3y04`
            );

            if (response.ok) {
              const data = await response.json();
              fetchedImages[category] = data.results.map(
                (image: ImageType) => image.urls.small
              );
            } else {
              console.error(`Failed to fetch images for category: ${category}`);
            }
          })
        );

        setCategoryImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  async function postProducts() {
    const categories = [
      { category: "Electronics", basePrice: 500 },
      { category: "Clothing", basePrice: 20 },
      { category: "Books", basePrice: 15 },
      { category: "Toys", basePrice: 10 },
      { category: "Home Appliances", basePrice: 100 },
    ];

    const productsToPost: IProduct[] = [];
    const placeholderImage = "/cartplaceholder.png";

    categories.forEach(({ category, basePrice }) => {
      const images = categoryImages[category] || [];
      for (let i = 0; i < Math.min(5, images.length); i++) {
        if (images[i]) {
          productsToPost.push({
            name: `${category} Product ${i + 1}`,
            price: basePrice + i * 10,
            category,
            imgSrc: images[i] || placeholderImage,
            fileKey: `fileKey-${category}-${i}`,
          });
        }
      }
    });

    if (productsToPost.length > 0) {
      try {
        const response = await fetch("/api/post_product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productsToPost),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Products posted successfully:", result);
        setUpdateTable((prev) => !prev); // Refresh the table
      } catch (error) {
        console.error("Error posting products:", error);
      }
    } else {
      console.log("No valid products to post.");
    }
  }

  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-md h-[calc(100vh-96px)] rounded-lg p-6 shadow-lg">
      <h2 className="text-3xl font-semibold text-white mb-6">All Products</h2>
      <button
        onClick={postProducts}
        className="bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg mb-4 hover:bg-green-700 transition-all"
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
                key={index}
                srNo={index + 1}
                setUpdateTable={setUpdateTable}
                product={product}
                setOpenPopup={setOpenPopup}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
