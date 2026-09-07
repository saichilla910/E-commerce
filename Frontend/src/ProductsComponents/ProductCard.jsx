const ProductCard = ({ product }) => {
  return (
    <div
      className="w-full h-92 bg-white rounded-xl border overflow-hidden shadow-sm 
                cursor-pointer
                transition-transform duration-300 ease-out
                hover:scale-[1.05] hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={product.images.thumbnail}
          alt={product.images.alt_text || product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Brand: {product.brand.name}
        </p>
        <div className="flex items-center gap-3 mt-3">
          {/* Selling Price */}
          <span className="text-xl font-bold text-gray-900">
            ₹{product.pricing.selling_price}
          </span>

          {/* Original Price */}
          <span className="text-sm text-gray-500 line-through">
            ₹{product.pricing.list_price}
          </span>

          {/* Discount */}
          <span className="text-sm font-semibold text-green-600">
            {product.pricing.discount_percentage}% off
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
