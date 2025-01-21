import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface Ad {
  id: number;
  title: string;
  image: string;
  description: string;
  cta: string;
}

const Advertisements: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  // Array of static shop/store advertisement images
  const randomImages = [
    '/vercel.svg',
    '/vercel.svg',
    '/vercel.svg',
    '/vercel.svg',
    '/vercel.svg',
    '/vercel.svg',
  ];

  useEffect(() => {
    // Add predefined ads to the state
    const predefinedAds = randomImages.map((img, index) => ({
      id: index + 1,
      title: `Shop ${index + 1}`,
      image: img,
      description: `Discover the best deals and offers from Shop ${index + 1}.`,
      cta: 'Shop Now',
    }));
    setAds(predefinedAds);

    // Auto-scroll effect
    if (autoScroll) {
      const interval = setInterval(() => {
        const container = document.querySelector('.advertisements-container');
        if (container) {
          container.scrollBy({ left: 1, behavior: 'smooth' });
        }
      }, 50);  // Adjust the speed as needed

      return () => clearInterval(interval);
    }
  }, [autoScroll]);

  const handleMouseEnter = () => setAutoScroll(false);
  const handleMouseLeave = () => setAutoScroll(true);

  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">Advertisements</h3>
        <div
          className="flex gap-6 advertisements-container overflow-x-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {ads.map((ad) => (
            <div key={ad.id} className="bg-black text-white rounded-lg shadow-lg overflow-hidden w-72">
              <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">{ad.title}</h4>
                <p className="text-gray-400 text-sm">{ad.description}</p>
                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all">
                  {ad.cta}
                </button>
              </div>
            </div>
          ))}
          {loading && (
            <div className="w-full flex justify-center items-center py-6">
              <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Advertisements;
