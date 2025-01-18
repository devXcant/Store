import { useAppSelector } from "@/lib/hook";
import React, { Dispatch, SetStateAction } from "react";
import { RxCross1 } from "react-icons/rx";
import CartProduct from "./CartProduct";
import { useRouter } from "next/navigation";

// Make sure you pass the correct type for props
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
  // Access the data from the fetchCart slice
  const products = useAppSelector((state) => state.fetchCart.data);


  const getTotal = () => {
    let total = 0;
    products.forEach(
      (item: { price: number; quantity: number }) =>
        (total = total + item.price * item.quantity)
    );
    return total;
  };

  console.log(getTotal())

  const handleCheckout = () => {
    const totalAmount = getTotal();
    router.push(`/checkout?totalAmount=${totalAmount}`);
  };


  return (
    <div className="bg-black bg-opacity-50 w-full min-h-screen fixed left-0 top-0 z-50 overflow-y-auto backdrop-blur-sm font-urbanist">
      <div className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-8  shadow-lg">
        {/* Close Button */}
        <RxCross1
          className="absolute right-4 top-4 text-2xl cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={() => setShowCart(false)}
        />

        <h3 className="pt-6 text-2xl font-semibold text-gray-800">Your Cart</h3>

        {/* Cart Items */}
        <div className="mt-6 space-y-4">
          {products?.map((item: IproductResponse) => {
            return (
              <CartProduct
                key={item.id}
                id={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
              />
            );
          })}
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center font-medium text-xl py-4 mt-6 border-t text-black border-gray-300">
          <p>Total:</p>
          <p>${getTotal()}.00</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mt-6">
          <button className="bg-black text-white text-center w-full rounded-3xl py-3 hover:bg-gray-800 transition-all">
            View Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-black text-white text-center w-full rounded-3xl py-3 hover:bg-gray-800 transition-all"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
