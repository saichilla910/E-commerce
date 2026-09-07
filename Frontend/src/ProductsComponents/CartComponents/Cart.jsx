import React from "react";
import { Link } from "react-router-dom";
const Cart = ({ cartItem, setCartItem }) => {

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItem((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: (item.quantity || 1) - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product completely
  const removeProduct = (id) => {
    setCartItem((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  // Calculate subtotal
  const subtotal = cartItem.reduce(
    (total, item) =>
      total + item.price * (item.quantity || 1),
    0
  );

  // Shipping
  const shipping = subtotal > 500 ? 0 : 40;

  // Final total
  const total = subtotal + shipping;

  // Empty cart
  if (cartItem.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500">
            Add some products to your cart to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= CART ITEMS ================= */}
          <div className="lg:col-span-2 space-y-4">

            {cartItem.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
              >

                <div className="flex flex-col sm:flex-row gap-5">

                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">

                    <img
                      src={item.images.thumbnail || item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />

                  </div>

                  {/* Product Information */}
                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h2 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h2>

                        {/* Category */}
                        {item.category && (
                          <p className="text-sm text-gray-500 mt-1">
                            {typeof item.category === "object"
                              ? item.category.name
                              : item.category}
                          </p>
                        )}

                      </div>

                      {/* Price */}
                      <p className="text-lg font-bold text-gray-900">
                        ₹{item.price}
                      </p>

                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-6">

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">

                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-4 py-2 text-lg hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="px-4 py-2 font-medium">
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-4 py-2 text-lg hover:bg-gray-100"
                        >
                          +
                        </button>

                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeProduct(item.id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>

                    </div>

                    {/* Item Total */}
                    <p className="text-sm text-gray-500 mt-4">
                      Item total: ₹
                      {(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* ================= CHECKOUT SIDEBAR ================= */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">

              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Subtotal */}
              <div className="flex justify-between mb-4">

                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-medium">
                  ₹{subtotal.toFixed(2)}
                </span>

              </div>


              {/* Shipping */}
              <div className="flex justify-between mb-4">

                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="font-medium">
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping.toFixed(2)}`}
                </span>

              </div>


              {/* Divider */}
              <div className="border-t border-gray-200 my-5"></div>


              {/* Total */}
              <div className="flex justify-between mb-6">

                <span className="text-lg font-bold text-gray-900">
                  Total
                </span>

                <span className="text-xl font-bold text-gray-900">
                  ₹{total.toFixed(2)}
                </span>

              </div>


              {/* Checkout */}
              <button
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </button>


              {/* Continue Shopping */}
              <button
                className="w-full mt-3 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
              >
              <Link to='/'>Continue Shopping</Link>  
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;

