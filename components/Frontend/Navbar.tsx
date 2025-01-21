import { useAppSelector } from "@/lib/hook";
import { getToken } from "@/utils/token";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

interface PropType {
  setShowCart: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setShowCart }: PropType) => {
  // Accessing the cart count by getting the length of the data array
  const cartCount = useAppSelector((state) => state.fetchCart.data.length);
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    const storedUser = localStorage.getItem("user");


    if (token) {
      setIsLoggedIn(true);
      setUser(storedUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  return (
    <div className="pt-4 bg-gray-900 text-white shadow-lg sticky top-0 z-10 font-urbanist">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gradient bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text font-bebas leading-[22px]">
            DEVX's STORE
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex w-full max-w-[500px]">
            <input
              type="text"
              placeholder="Search for products..."
              className="border-2 border-gray-700 bg-gray-800 text-gray-300 px-4 py-2 w-full rounded-l-md focus:outline-none focus:border-green-500"
            />
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 px-6 py-2 rounded-r-md flex items-center justify-center hover:from-green-300 hover:to-blue-400 transition-all duration-300">
              <BsSearch size={20} />
            </button>
          </div>

          {/* Icons and Account Section */}
          <div className="flex items-center gap-6">
            {/* User Account */}
            <div className="hidden md:flex items-center gap-3">
              <div className="rounded-full bg-gray-800 border-2 border-gray-700 text-gray-300 text-[32px] w-[50px] h-[50px] grid place-items-center transition-transform transform hover:scale-110">
                <AiOutlineUser />
              </div>
              <div>
                {isLoggedin ? (
                  <p className="text-gray-400 text-sm">Hello, {user}</p>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-400 text-sm">Hello, Sign in</p>
                    <p className="font-medium text-sm text-white">
                      Your Account
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Cart Icon */}
            <div
              className="relative text-gray-300 text-[32px] cursor-pointer transition-transform transform hover:scale-110"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShoppingCart />
              <div className="absolute top-[-5px] right-[-5px] bg-red-500 w-[20px] h-[20px] rounded-full text-white text-[12px] flex items-center justify-center">
                {cartCount}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-4"></div>
      </div>
    </div>
  );
};

export default Navbar;
