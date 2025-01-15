import { useAppDispatch } from "@/lib/hook";
import { addToCart } from "@/redux/features/cart";
import { makeToast } from "@/utils/helper";
import React from "react";
import { AiFillStar, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";

interface propsType {
  id: string;
  img: string;
  category: string;
  title: string;
  price: number;
  isLoading: boolean; // New prop to indicate loading state
}

const ProductCard = ({ id, img, category, title, price, isLoading }: propsType) => {
  const dispatch = useAppDispatch();

  const addProductToCart = () => {
    const payload = {
      id,
      img,
      title,
      price,
      quantity: 1,
    };
    dispatch(addToCart(payload));
    makeToast("Added to cart");
  };

  return (
    <div
      className={`${
        isLoading ? "animate-pulse" : ""
      } rounded-xl  shadow-lg bg-black border font-urbanist transition-all duration-300 mb-10`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={isLoading ? "/cartplaceholder.jpg" : img}
          alt={title}
          className="w-90%  h-[200px] object-cover transition-transform transform hover:scale-105"
        />
      </div>

      {/* Product Info Section */}
      <div className="px-6 py-4 border-t border-grey-100">
        {/* Category */}
        <p className="text-sm text-[#00A1AB]">{category}</p>

        {/* Title */}
        <h2 className="font-semibold text-[#020112] mt-1">{isLoading ? "Loading..." : title}</h2>

        {/* Ratings */}
        <div className="mt-2 flex items-center text-[#FFB21D]">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => <AiFillStar key={index} className="animate-pulse" />)
            : Array(4)
                .fill(0)
                .map((_, index) => <AiFillStar key={index} />)}
          <AiOutlineStar />
          <p className="text-gray-600 text-xs ml-2">{isLoading ? "(Loading...)" : "(3 Reviews)"}</p>
        </div>

        {/* Price and Add to Cart Button */}
        <div className="flex justify-between items-center mt-4">
          <h2 className="font-medium text-[#020112] text-xl">{isLoading ? "$..." : `$${price}`}</h2>

          {/* Add to Cart Button */}
          <div
            className={`flex gap-2 items-center ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-800 text-white cursor-pointer hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            } px-4 py-2 rounded-md `}
            onClick={!isLoading ? addProductToCart : undefined} // Disable click during loading
          >
            <AiOutlineShoppingCart /> {isLoading ? "Loading..." : "Add to Cart"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
