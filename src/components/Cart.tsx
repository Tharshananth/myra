import React, { useState } from 'react';
import { useCart } from './CartProvider';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Clock, X } from 'lucide-react';
import Header from './Header';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  landmark: string;
}

interface OrderConfirmation {
  orderId: string;
  status: 'success' | 'error';
  message: string;
  timestamp?: string;
}

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
  });

const handleCheckout = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate required fields
  if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.phone || !checkoutForm.address) {
    alert('Please fill all required fields (Name, Email, Phone, Address)');
    return;
  }

  setIsCheckingOut(true);

  try {
    const subtotal = getTotalPrice();
    const deliveryFee = subtotal >= 500 ? 0 : 49;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + tax;

    const orderData = {
      customer: {
        name: checkoutForm.name,
        email: checkoutForm.email,
        phone: checkoutForm.phone,
        address: checkoutForm.address,
        landmark: checkoutForm.landmark || null,
      },
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price.replace('₹', ''),
        quantity: item.quantity,
        total: parseInt(item.price.replace('₹', '')) * item.quantity,
        image: item.image,
      })),
      pricing: {
        subtotal,
        deliveryFee,
        tax,
        total,
      },
    };

    const response = await fetch('/api/place-order', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      setOrderConfirmation({
        orderId: result.orderId,
        status: 'success',
        message: result.message,
        timestamp: result.timestamp,
      });
      clearCart();
      setShowCheckoutForm(false);
    } else {
      setOrderConfirmation({
        orderId: '',
        status: 'error',
        message: result.message || 'Failed to place order. Please try again.',
      });
    }
  } catch (error) {
    console.error('Checkout error:', error);
    setOrderConfirmation({
      orderId: '',
      status: 'error',
      message: 'Network error. Please check your connection and try again.',
    });
  } finally {
    setIsCheckingOut(false);
  }
};

  if (orderConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-md w-full mx-auto mt-20 bg-white rounded-2xl shadow-2xl p-8 text-center">
          {orderConfirmation.status === 'success' ? (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6 text-lg">{orderConfirmation.message}</p>
              <div className="bg-green-50 p-6 rounded-lg mb-6 border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-2">Order ID:</p>
                <p className="text-2xl font-bold text-green-700 font-mono break-all">{orderConfirmation.orderId}</p>
              </div>
              {orderConfirmation.timestamp && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-800">📅 Order Time:</p>
                  <p className="text-sm font-semibold text-blue-900">{orderConfirmation.timestamp}</p>
                </div>
              )}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">📧 Confirmation emails sent to:</p>
                <p className="text-sm font-semibold text-blue-900">{checkoutForm.email}</p>
                <p className="text-xs text-blue-700 mt-2">Check your inbox for order details</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
                <p className="text-sm text-yellow-800">💰 <strong>Payment Method:</strong> Cash on Delivery (COD)</p>
                <p className="text-sm text-yellow-800 mt-1">📞 Contact Pingus for payment details</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setOrderConfirmation(null);
                    window.location.href = '/';
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Order Failed</h2>
              <p className="text-gray-600 mb-6">{orderConfirmation.message}</p>
              <button
                onClick={() => setOrderConfirmation(null)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 text-lg">Looks like you haven't added anything to your cart yet.</p>
            </div>
            
            <div className="space-y-4">
              <a
                href="/"
                className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-green-800 mb-2">Fresh & Quality</h3>
                  <p className="text-green-700 text-sm">All our products are sourced fresh daily</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-yellow-800 mb-2">Fast Delivery</h3>
                  <p className="text-yellow-700 text-sm">Get your order delivered in 30-45 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;
  const savings = subtotal >= 500 ? 49 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <ShoppingBag className="mr-3 h-6 w-6" />
                  Your Cart ({getTotalItems()} items)
                </h1>
              </div>

              <div className="p-6 space-y-4">
                {cartItems.map((item) => {
                  const itemPrice = parseInt(item.price.replace('₹', ''));
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl flex items-center justify-center">
                          {typeof item.image === 'string' && item.image.startsWith('http') ? (
                            <img src={item.image} alt={item.name} className="h-16 w-16 object-contain" />
                          ) : (
                            <span className="text-3xl">{item.image}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-green-600 font-bold text-lg">₹{itemPrice}</span>
                          <span className="text-gray-500 text-sm ml-2">per item</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-xl text-gray-900">₹{itemTotal}</div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2 p-1 hover:bg-red-50 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear all items
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Delivery Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="font-medium text-green-800">Estimated Delivery</div>
                  <div className="text-green-700">30-45 minutes</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="font-medium text-blue-800">Delivery Address</div>
                  <div className="text-blue-700 text-sm">Will be confirmed at checkout</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Promo Code */}
                <div className="border border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-700">Have a promo code?</span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Savings Banner */}
                {savings > 0 && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                    <div className="text-green-800 font-medium text-sm">
                      🎉 You saved ₹{savings} on delivery!
                    </div>
                  </div>
                )}

                {/* Order Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span className="flex items-center">
                      Delivery Fee
                      {subtotal >= 500 && (
                        <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">FREE</span>
                      )}
                    </span>
                    <span className={subtotal >= 500 ? 'line-through text-gray-400' : ''}>
                      ₹{deliveryFee}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Taxes & Fees</span>
                    <span>₹{tax}</span>
                  </div>
                  
                  {subtotal < 500 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="text-yellow-800 text-sm">
                        Add ₹{500 - subtotal} more for free delivery!
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>

                {/* COD Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-blue-800 text-sm">
                    💰 <strong>Payment:</strong> Cash on Delivery (COD)<br/>
                    <span className="text-xs">Contact Pingus for payment</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Proceed to Checkout
                </button>

                {/* Payment Methods */}
                <div className="text-center space-y-2">
                  <div className="text-sm text-gray-600">Payment Method</div>
                  <div className="flex justify-center">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <span className="text-xs font-medium">💵 Cash on Delivery</span>
                    </div>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-green-600 font-medium text-sm">🔒 Secure</div>
                    <div className="text-gray-600 text-xs">Order</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 font-medium text-sm">🚚 Fresh</div>
                    <div className="text-gray-600 text-xs">Delivery</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <a
                href="/"
                className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center"
              >
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-t-3xl flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Delivery Details</h3>
              <button
                onClick={() => setShowCheckoutForm(false)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="p-8 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  👤 Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  📧 Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={checkoutForm.email}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Order confirmation will be sent to this email</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  📱 Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+91 9876543210"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  📍 Delivery Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="House/Flat No., Street, Area, City, Pincode"
                  rows={3}
                  required
                />
              </div>

              {/* Landmark (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  🗺️ Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={checkoutForm.landmark}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, landmark: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Near temple, opposite park, etc."
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                <h4 className="font-bold text-gray-900">Order Total</h4>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">{deliveryFee === 0 ? '🎉 FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-green-600">
                  <span>Total (COD):</span>
                  <span>₹{total}</span>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mt-3">
                  <p className="text-sm text-yellow-800">
                    💰 <strong>Payment Method:</strong> Cash on Delivery<br/>
                    📞 Contact Pingus for payment details
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={isCheckingOut}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isCheckingOut ? 'Processing Order...' : 'Place Order'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;