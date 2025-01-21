import React from "react";

interface ProductCardViewProps {
  id: string;
  img: string;
  category: string;
  title: string;
  price: number;
  quantity: number;
  delivery: string;
  availability: string;
  description: string;
}

const ProductCardView = ({
  id,
  img,
  category,
  title,
  price,
  quantity,
  delivery,
  availability,
  description,
}: ProductCardViewProps) => {
  return (
    <div className="bg-black rounded-lg p-6 font-urbanist text-white">
      {/* Image Section */}
      <img src={img} alt={title} className="w-full h-60 object-cover rounded-lg mb-4" />

      {/* Title and Category Section */}
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-[#00A1AB] mb-2">{category}</p>

      {/* Price and Quantity Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-white">${price}</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm text-white">Quantity: {quantity}</p>
        </div>
      </div>

      {/* Icons and Additional Info Section */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <span className="text-[#00A1AB]">🚘</span>
          <p>Delivery:{delivery}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#00A1AB]">🕒</span>
          <p>{availability}</p>
        </div>
      </div>

      {/* Description Section */}
      <p className="text-sm font-extralight  text-white mt-4">Description:{description}</p>
    </div>
  );
};

export default ProductCardView;
