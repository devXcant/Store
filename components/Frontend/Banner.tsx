import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [typedText, setTypedText] = useState('');
  const message = "Welcome to DEVX's STORE";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setTypedText(message.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);  // Adjust typing speed as needed

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className=" text-white py-16 flex items-center justify-center font-urbanist">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">{typedText}</h2>
        <p className="text-lg">Discover the best products crafted with elegance and style.</p>
        <div  className="mt-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition-all">
          <Link href="#Trending">
          Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
