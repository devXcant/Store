import { useAppSelector } from "@/lib/hook";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import CartProduct from "./CartProduct";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";

interface PropType {
  setShowCart: Dispatch<SetStateAction<boolean>>;
}
interface IproductResponse {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
}

const Cart = ({ setShowCart }: PropType) => {
  const router = useRouter();
  const products = useAppSelector((state) => state.fetchCart.data);

  const getTotal = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const token = getToken();

  const handleCheckout = () => {
    if (!token) {
      router.push("/Login");
    }

    const totalAmount = getTotal();
    router.push(`/checkout?totalAmount=${totalAmount}`);
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-black bg-opacity-80 w-full min-h-screen fixed left-0 top-0 z-50 overflow-y-auto backdrop-blur-sm font-urbanist ">
      <div className="max-w-[400px] w-full min-h-full bg-black  absolute right-0 top-0 p-8 shadow-lg border border-gray-100/10 ">
        {/* Close Button */}
        <RxCross1
          className="absolute right-4 top-4 text-2xl cursor-pointer text-white hover:text-purple-500"
          onClick={() => setShowCart(false)}
        />

        <h3 className="pt-6 text-2xl font-semibold text-white">Your Cart</h3>

        {/* Cart Items */}
        <div className="mt-6 space-y-4">
          {products?.map((item) => (
            <CartProduct
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center font-medium text-xl py-4 mt-6 border-t border-gray-700 text-white">
          <p>Total:</p>
          <p>${getTotal()},00</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mt-6">
          {/* <button className="bg-black text-white text-center w-full rounded-3xl py-3 bg-purple-600 transition-all">
            View Cart
          </button> */}
          <button
            onClick={handleCheckout}
            className="bg-gradient-to-r from-green-400 to-blue-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white text-center w-full rounded-3xl py-3  transition-all"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
