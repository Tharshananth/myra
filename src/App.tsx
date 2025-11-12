import React, { useState, useEffect } from 'react';
import { CartProvider } from './components/CartProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import OwnBox from './components/OwnBox';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating?: number;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  deliveryTime?: string;
}

interface SearchFilters {
  priceRange: [number, number];
  category: string;
  sortBy: string;
}

// Main App Component - Wrapped inside CartProvider
const AppContent = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    priceRange: [0, 2000],
    category: 'all',
    sortBy: 'relevance'
  });

  // Handle URL changes
  useEffect(() => {
    const updatePageFromURL = () => {
      const path = window.location.pathname;
      if (path === '/cart') {
        setCurrentPage('cart');
      } else {
        setCurrentPage('home');
      }
    };

    // Set initial page
    updatePageFromURL();

    // Listen for navigation changes
    const handlePopState = () => {
      updatePageFromURL();
    };

    window.addEventListener('popstate', handlePopState);
    
    // Custom event for programmatic navigation
    window.addEventListener('navigate', handlePopState as any);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigate', handlePopState as any);
    };
  }, []);

  const snackBoxes = [
    {
      id: 1,
      name: 'Classic Mix Box',
      price: '₹399',
      image: '🥨',
      description: 'A delightful mix of traditional snacks including pretzels, crackers, and nuts.',
      rating: 4.5,
      ingredients: ['Pretzels', 'Mixed Nuts', 'Crackers', 'Cheese Bites'],
      nutritionalInfo: { calories: 320, protein: '12g', carbs: '28g', fat: '18g' },
      deliveryTime: '25-35 mins'
    },
    {
      id: 2,
      name: 'Healthy Crunch',
      price: '₹499',
      image: '🥗',
      description: 'Nutritious and delicious mix of dried fruits, seeds, and organic snacks.',
      rating: 4.7,
      ingredients: ['Dried Fruits', 'Mixed Seeds', 'Organic Chips', 'Protein Bars'],
      nutritionalInfo: { calories: 280, protein: '15g', carbs: '22g', fat: '14g' },
      deliveryTime: '30-40 mins'
    },
    {
      id: 3,
      name: 'Sweet Treats Box',
      price: '₹449',
      image: '🍪',
      description: 'Indulgent selection of cookies, chocolates, and sweet delicacies.',
      rating: 4.6,
      ingredients: ['Assorted Cookies', 'Premium Chocolate', 'Candy Mix', 'Sweet Bars'],
      nutritionalInfo: { calories: 420, protein: '8g', carbs: '52g', fat: '22g' },
      deliveryTime: '20-30 mins'
    }
  ];

  const eventBoxes = [
    {
      id: 4,
      name: 'Deepavali Special',
      price: '₹699',
      image: '🎇',
      description: 'Special Deepavali themed snacks and treats perfect for celebrations.',
      rating: 4.8,
      ingredients: ['Traditional Sweets', 'Dry Fruits', 'Festive Cookies', 'Special Namkeens'],
      nutritionalInfo: { calories: 380, protein: '10g', carbs: '45g', fat: '18g' },
      deliveryTime: '35-45 mins'
    },
    {
      id: 5,
      name: 'Onam Celebration',
      price: '₹899',
      image: '🌸',
      description: 'Traditional Onam feast snacks ideal for celebrations and gatherings.',
      rating: 4.9,
      ingredients: ['Banana Chips', 'Coconut Sweets', 'Traditional Snacks', 'Festive Mix'],
      nutritionalInfo: { calories: 350, protein: '9g', carbs: '42g', fat: '16g' },
      deliveryTime: '40-50 mins'
    },
    {
      id: 6,
      name: 'Iftar Box',
      price: '₹799',
      image: '🕌',
      description: 'Specially curated Iftar items perfect for breaking the fast.',
      rating: 4.7,
      ingredients: ['Dates', 'Traditional Sweets', 'Savory Snacks', 'Refreshing Items'],
      nutritionalInfo: { calories: 400, protein: '11g', carbs: '48g', fat: '19g' },
      deliveryTime: '30-40 mins'
    }
  ];

  const catering = [
    {
      id: 7,
      name: 'Small Event Catering',
      price: '₹1799',
      image: '🍽',
      description: 'Complete catering solution for events up to 20 people.',
      rating: 4.6,
      ingredients: ['Main Course', 'Appetizers', 'Desserts', 'Beverages'],
      nutritionalInfo: { calories: 450, protein: '20g', carbs: '35g', fat: '25g' },
      deliveryTime: '60-90 mins'
    },
    {
      id: 8,
      name: 'Large Event Catering',
      price: '₹3999',
      image: '🏢',
      description: 'Full-service catering for corporate events and large gatherings.',
      rating: 4.8,
      ingredients: ['Multiple Courses', 'Variety Pack', 'Premium Items', 'Complete Service'],
      nutritionalInfo: { calories: 500, protein: '25g', carbs: '40g', fat: '28g' },
      deliveryTime: '90-120 mins'
    },
    {
      id: 9,
      name: 'Custom Menu Planning',
      price: '₹2999',
      image: '📋',
      description: 'Personalized catering with custom menu design and planning.',
      rating: 4.7,
      ingredients: ['Custom Items', 'Personalized Menu', 'Special Requests', 'Premium Service'],
      nutritionalInfo: { calories: 400, protein: '18g', carbs: '38g', fat: '22g' },
      deliveryTime: '75-105 mins'
    }
  ];

  const otherProducts = [
    {
      id: 10,
      name: 'Birthday Cakes',
      price: '₹319',
      image: '🎂',
      description: 'Fresh baked birthday cakes in various flavors and sizes.',
      rating: 4.9,
      ingredients: ['Fresh Cream', 'Premium Flour', 'Natural Flavors', 'Decorative Elements'],
      nutritionalInfo: { calories: 350, protein: '6g', carbs: '55g', fat: '14g' },
      deliveryTime: '45-60 mins'
    },
    {
      id: 11,
      name: 'Artisan Beverages',
      price: '₹579',
      image: '🥤',
      description: 'Handcrafted drinks and specialty beverages from local artisans.',
      rating: 4.4,
      ingredients: ['Natural Ingredients', 'Fresh Fruits', 'Herbal Extracts', 'Premium Water'],
      nutritionalInfo: { calories: 120, protein: '2g', carbs: '28g', fat: '1g' },
      deliveryTime: '15-25 mins'
    },
    {
      id: 12,
      name: 'Gift Hampers',
      price: '₹999',
      image: '🎁',
      description: 'Beautifully packaged gift collections for special occasions.',
      rating: 4.8,
      ingredients: ['Assorted Items', 'Premium Packaging', 'Variety Pack', 'Special Selection'],
      nutritionalInfo: { calories: 300, protein: '8g', carbs: '35g', fat: '15g' },
      deliveryTime: '30-45 mins'
    }
  ];

  const allProducts = [...snackBoxes, ...eventBoxes, ...catering, ...otherProducts];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string, filters: SearchFilters) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };

  const filterProducts = (products: Product[]) => {
    if (!searchQuery && searchFilters.category === 'all') return products;
    
    return products.filter(product => {
      const matchesQuery = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const price = parseInt(product.price.replace('₹', ''));
      const matchesPrice = price >= searchFilters.priceRange[0] && price <= searchFilters.priceRange[1];
      
      const matchesCategory = searchFilters.category === 'all' || 
        (searchFilters.category === 'corporate' && snackBoxes.includes(product as any)) ||
        (searchFilters.category === 'festive' && eventBoxes.includes(product as any)) ||
        (searchFilters.category === 'birthday' && otherProducts.includes(product as any)) ||
        (searchFilters.category === 'catering' && catering.includes(product as any));
      
      return matchesQuery && matchesPrice && matchesCategory;
    });
  };

  // Render current page
  if (currentPage === 'cart') {
    return <Cart />;
  }

  return (
    <>
      <Header />
      <Hero />
      <SearchBar onSearch={handleSearch} products={allProducts} />
      
      <ProductSection
        id="snack-boxes"
        title="Corporate"
        subtitle="Curated snack collections specially designed for businesses, meetings, and corporate events."
        products={filterProducts(snackBoxes)}
        onProductClick={handleProductClick}
      />
      <ProductSection
        id="event-boxes"
        title="Festive & Other Events"
        subtitle="Thoughtfully crafted snack boxes perfect for celebrations, festivals, corporate meetings, and special occasions."
        products={filterProducts(eventBoxes)}
        onProductClick={handleProductClick}
      />
      <ProductSection
        id="catering"
        title="Birthday"
        subtitle="Professional catering for birthdays of all sizes, offering curated snack boxes and exceptional service."
        products={filterProducts(otherProducts)}
        onProductClick={handleProductClick}
      />
      <OwnBox />
      <ProductSection
        id="other-products"
        title="Catering"
        subtitle="Delicious dishes and special foods for every occasion, from small gatherings to big celebrations."
        products={filterProducts(catering)}
        onProductClick={handleProductClick}
      />
      
      <Testimonials />
      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// Main App Component with CartProvider wrapper
function App() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </CartProvider>
  );
}

export default App;