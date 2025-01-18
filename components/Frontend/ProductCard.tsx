import { useAppDispatch } from "@/lib/hook";
import { addToCart, updateCartQuantity } from "@/redux/features/cart";  // Assuming you have an updateCartQuantity action
import { makeToast } from "@/utils/helper";
import React, { useState } from "react";
import { AiFillStar, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";

interface propsType {
  id: string;
  img: string;
  category: string;
  title: string;
  price: number;
  isLoading: boolean;
}

const ProductCard = ({ id, img, category, title, price, isLoading }: propsType) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

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


  const addProductToCart = () => {
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

  const updateCartQuantityInStore = () => {
    const payload = {
      id,
      quantity,
    };
    dispatch(updateCartQuantity(payload));  
  };

  return (
    <div
      className={`${
        isLoading ? "animate-pulse" : ""
      } rounded-xl shadow-lg bg-black border font-urbanist transition-all duration-300 mb-10`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={isLoading ? "/cartplaceholder.jpg" : img}
          alt={title}
          className="w-90% h-[200px] object-cover transition-transform transform hover:scale-105"
        />
      </div>

      {/* Product Info Section */}
      <div className="px-6 py-4 border-t border-grey-100">
        {/* Category */}
        <p className="text-sm text-[#00A1AB]">{category}</p>

        {/* Title */}
        <h2 className="font-semibold text-[#020112] mt-1">
          {isLoading ? "Loading..." : title}
        </h2>

        {/* Ratings */}
        <div className="mt-2 flex items-center text-[#FFB21D]">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <AiFillStar key={index} className="animate-pulse" />
                ))
            : Array(4)
                .fill(0)
                .map((_, index) => <AiFillStar key={index} />)}
          <AiOutlineStar />
          <p className="text-gray-600 text-xs ml-2">
            {isLoading ? "(Loading...)" : "(3 Reviews)"}
          </p>
        </div>

        {/* Price and Add to Cart Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col gap-2 items-between">
            <h2 className="font-medium text-white text-xl">
              {isLoading ? "$..." : `$${price}`}
            </h2>
            <div className="flex flex-row justify-between gap-2">
              <button
                className="rounded-full w-50"
                onClick={decreaseQuantity}
                disabled={isLoading || quantity <= 1}
              >
                -
              </button>
              <span className="flex items-center justify-center w-12">{quantity}</span>
              <button className="rounded-full w-50" onClick={increaseQuantity} disabled={isLoading}>
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div
            className={`flex gap-2 items-center ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-800 text-white cursor-pointer hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            } px-4 py-2 rounded-md`}
            onClick={!isLoading ? addProductToCart : undefined}
          >
            <AiOutlineShoppingCart /> {isLoading ? "Loading..." : "Add to Cart"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
