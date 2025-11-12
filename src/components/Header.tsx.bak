<<<<<<< HEAD
=======
// src/components/Header.tsx - REPLACE YOUR EXISTING FILE WITH THIS

>>>>>>> 9c3f91f6b171c92caeada8bb6937f3780576dd0f
import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { useCart } from './CartProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, getTotalPrice } = useCart();

  const navItems = [
<<<<<<< HEAD
    { name: 'Corporate', href: '#snack-boxes' },
    { name: 'Festive & other events', href: '#event-boxes' },
    { name: 'Birthday', href: '#catering' },
    { name: 'Create Your Own Box', href: '#own-box' },
=======
    { name: 'All Products', href: '/products' },
    { name: 'Corporate', href: '#snack-boxes' },
    { name: 'Festive & other events', href: '#event-boxes' },
    { name: 'Birthday', href: '#catering' },
>>>>>>> 9c3f91f6b171c92caeada8bb6937f3780576dd0f
    { name: 'Catering', href: '#other-products' },
  ];

  const navigateToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/cart');
    window.dispatchEvent(new CustomEvent('navigate'));
  };

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new CustomEvent('navigate'));
  };

<<<<<<< HEAD
=======
  const navigateToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/products');
    window.dispatchEvent(new CustomEvent('navigate'));
  };

  const handleNavClick = (e: React.MouseEvent, item: any) => {
    if (item.href === '/products') {
      navigateToProducts(e);
    } else if (item.href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigateToHome(e);
        setTimeout(() => {
          document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

>>>>>>> 9c3f91f6b171c92caeada8bb6937f3780576dd0f
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={navigateToHome}
              className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
            >
              Myra Foods
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
<<<<<<< HEAD
                onClick={(e) => {
                  // If we're on cart page, go to home first
                  if (window.location.pathname === '/cart') {
                    navigateToHome(e);
                    setTimeout(() => {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
=======
                onClick={(e) => handleNavClick(e, item)}
>>>>>>> 9c3f91f6b171c92caeada8bb6937f3780576dd0f
                className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <a href="mailto:sanjaibalasubramaniam26@gmail.com" className="text-sm">Contact</a>
            </div>
<<<<<<< HEAD
            {/* Cart Button with Items Count and Total */}
=======
            {/* Cart Button */}
>>>>>>> 9c3f91f6b171c92caeada8bb6937f3780576dd0f
            <button
              onClick={navigateToCart}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 relative"
            >
              <div className="relative">
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getTotalItems() > 99 ? '99+' : getTotalItems()}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs">Cart ({getTotalItems()})</span>
                {getTotalItems() > 0 && (
                  <span className="text-xs font-bold">₹{getTotalPrice()}</span>
                )}
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
<<<<<<< HEAD
            {/* Mobile Cart Button */}
=======
>>>>>>> 9c3f91f6b171c92caeada8bb6937f3780576dd0f
            <button
              onClick={navigateToCart}
              className="relative bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getTotalItems() > 99 ? '99+' : getTotalItems()}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-base font-medium"
                  onClick={(e) => {
                    setIsMenuOpen(false);
<<<<<<< HEAD
                    if (window.location.pathname === '/cart') {
                      navigateToHome(e);
                      setTimeout(() => {
                        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
=======
                    handleNavClick(e, item);
>>>>>>> 9c3f91f6b171c92caeada8bb6937f3780576dd0f
                  }}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <a href="mailto:sanjaibalasubramaniam26@gmail.com" className="text-sm">Contact</a>
                </div>
<<<<<<< HEAD
                {/* Mobile Cart Info */}
=======
>>>>>>> 9c3f91f6b171c92caeada8bb6937f3780576dd0f
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">
                    {getTotalItems()} items
                  </div>
                  {getTotalItems() > 0 && (
                    <div className="text-sm font-bold text-green-600">
                      ₹{getTotalPrice()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;