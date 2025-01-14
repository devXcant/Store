import { removeFromCart } from "@/redux/features/cart";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";

interface propsType {
  id: string;
  img: string;
  title: string;
  price: number;
  quantity: number;
}

const CartProduct: React.FC<propsType> = ({
  id,
  img,
  title,
  price,
  quantity,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <img
          src={img}
          alt={title}
          className="h-[80px] w-[80px] object-cover rounded-md border border-gray-300"
        />

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">
            {quantity} x ${price}
          </p>
        </div>
      </div>

      {/* Remove Icon */}
      <RxCross1
        className="cursor-pointer text-gray-600 hover:text-red-600 transition-all duration-300"
        onClick={() => dispatch(removeFromCart(id))}
      />
    </div>
  );
};

export default CartProduct;
