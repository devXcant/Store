import { useAppDispatch } from "@/lib/hook";
import { addToCart, updateCartQuantity } from "@/redux/features/cart";
import { makeToast } from "@/utils/helper";
import React, { useState } from "react";
import { AiFillStar, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import ProductCardView from "./ProductCardView";

interface propsType {
  id: string;
  img: string;
  category: string;
  title: string;
  price: number;
  isLoading: boolean;
  delivery: string;
  availability: string;
  description: string;
}

const ProductCard = ({ id, img, category, title, price, isLoading, delivery, availability, description }: propsType) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(updateCartQuantity({ id, quantity: quantity + 1 }));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateCartQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const addProductToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    const payload = {
      id,
      img,
      title,
      price,
      quantity,
    };
    dispatch(addToCart(payload));
    makeToast("Added to cart");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className={`${
          isLoading ? "animate-pulse" : ""
        } rounded-xl bg-black border font-urbanist transition-all duration-300 mb-10 hover:cursor-pointer`}
        onClick={openModal}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={isLoading ? "/cartplaceholder.jpg" : img}
            alt={title}
            className="w-full h-[200px] object-cover transition-transform transform hover:scale-105"
          />
        </div>

        {/* Product Info Section */}
        <div className="px-6 py-4 border-t border-grey-100">
          <p className="text-sm text-[#00A1AB]">{category}</p>
          <h2 className="font-semibold text-[#020112] mt-1">
            {isLoading ? "Loading..." : title}
          </h2>
          <div className="mt-2 flex items-center text-[#FFB21D]">
            {Array(4)
              .fill(0)
              .map((_, index) => <AiFillStar key={index} />)}
            <AiOutlineStar />
            <p className="text-gray-600 text-xs ml-2">(3 Reviews)</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <h2 className="font-medium text-white text-xl">
              {isLoading ? "$..." : `$${price}`}
            </h2>
            <div className="flex items-center gap-2">
              <button
                className="rounded-full w-8 h-8 bg-gray-700 text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal from opening
                  decreaseQuantity();
                }}
                disabled={isLoading || quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="rounded-full w-8 h-8 bg-gray-700 text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal from opening
                  increaseQuantity();
                }}
                disabled={isLoading}
              >
                +
              </button>
            </div>
          </div>
          <button
            className={`mt-4 w-full rounded-md py-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 transition-all duration-300"
            }`}
            onClick={addProductToCart}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="bg-black rounded-lg w-full md:w-3/5 p-6 relative border border-gray-100">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              ✕
            </button>
            <ProductCardView
              id={id}
              img={img}
              category={category}
              title={title}
              price={price}
              quantity={quantity}
              delivery="Location determines amount of days to delivery"
              availability={availability}
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam reprehenderit eaque distinctio libero id recusandae eius modi. Nulla laborum eius pariatur dolor tenetur dolorem enim sapiente aliquid eligendi cumque? Autem?"
            />
          </div>
        </div>

      )}
    </>
  );
};

export default ProductCard;
