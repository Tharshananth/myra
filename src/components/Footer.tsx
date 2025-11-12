import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    'About Us', 'Menu', 'Delivery Areas', 'Careers', 'Contact Us'
  ];

  const categories = [
    'Snack Boxes', 'Event Specific', 'Catering Services', 'Other Products'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">Myra Foods</h3>
              <p className="text-gray-300 leading-relaxed">
                Delivering fresh, delicious, and quality food experiences to your doorstep. Your satisfaction is our priority.
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-green-700 p-2 rounded-lg hover:bg-green-800 transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="bg-green-700 p-2 rounded-lg hover:bg-green-800 transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="bg-green-700 p-2 rounded-lg hover:bg-green-800 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-500 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-500 mb-4">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-500 mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">123 Food Street</p>
                  <p className="text-gray-300 text-sm">Downtown, City 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-500" />
                <p className="text-gray-300 text-sm">Whatsapp</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-500" />
                <p className="text-gray-300 text-sm">hello@myrafoods.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <p className="text-gray-300 text-sm">Mon - Fri: 8AM - 10PM</p>
                  <p className="text-gray-300 text-sm">Sat - Sun: 9AM - 11PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;