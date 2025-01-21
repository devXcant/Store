import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 font-urbanist w-full flex flex-col items-center justify-center">
      <div className="container mx-auto grid md:grid-cols-4 gap-6">

        {/* Company Info */}
        <div className="flex flex-col items-start">
          <div className="text-xl font-bold text-gradient bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text font-bebas leading-[22px]">
            DEVX's STORE
          </div>
          <p className="text-sm text-gray-400">
            Creating exceptional products with a touch of elegance and style.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-purple-500 transition-all">About Us</a></li>
            <li><a href="/contact" className="hover:text-purple-500 transition-all">Contact</a></li>
            <li><a href="/privacy" className="hover:text-purple-500 transition-all">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-purple-500 transition-all">Terms and Conditions</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Contact Us</h4>
          <p className="text-sm text-gray-400">123 Street Name, City, Country</p>
          <p className="text-sm text-gray-400">Phone: +123 456 7890</p>
          <p className="text-sm text-gray-400">Email: support@yourbrand.com</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-white">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="hover:text-purple-500 transition-all">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" className="hover:text-purple-500 transition-all">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" className="hover:text-purple-500 transition-all">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" className="hover:text-purple-500 transition-all">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
        © {new Date().getFullYear()} DEVX's STORE. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
