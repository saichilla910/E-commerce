import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products,addToCart }) => {
  const { id } = useParams();

  // Find product using the ID from the URL
  const product = products.find(
    (product) => product.id.toString() === id
  );

  // Keep hooks before conditional return
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.thumbnail || ""
  );

  const [quantity, setQuantity] = useState(1);

  // Increase quantity
  const increaseQuantity = () => {
    if (product && quantity < product.inventory.stock) {
      setQuantity((previousQuantity) => previousQuantity + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((previousQuantity) => previousQuantity - 1);
    }
  };

  // Product not found
  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            The product you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const galleryImages = product.images?.gallery || [];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-10">

      {/* ================= MAIN PRODUCT SECTION ================= */}
      <div
        className="
          max-w-7xl mx-auto bg-white rounded-2xl border shadow-sm
          p-5 sm:p-8
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ================= IMAGE SECTION ================= */}
          <div className="flex flex-col gap-4">

            {/* Main Image */}
            <div
              className="
                w-full h-[400px] sm:h-[500px]
                bg-gray-50 rounded-xl overflow-hidden
                flex items-center justify-center
              "
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.images?.alt_text || product.name}
                  className="
                    w-full h-full object-contain
                    hover:scale-105 transition-transform duration-500
                  "
                />
              ) : (
                <div className="text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">

              {/* Main Thumbnail */}
              {product.images?.thumbnail && (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage(product.images.thumbnail)
                  }
                  className={`
                    w-20 h-20 rounded-lg border-2 overflow-hidden
                    flex-shrink-0 transition
                    ${
                      selectedImage === product.images.thumbnail
                        ? "border-blue-600"
                        : "border-gray-200 hover:border-gray-400"
                    }
                  `}
                >
                  <img
                    src={product.images.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              )}

              {/* Gallery Images */}
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`
                    w-20 h-20 rounded-lg border-2 overflow-hidden
                    flex-shrink-0 transition
                    ${
                      selectedImage === image
                        ? "border-blue-600"
                        : "border-gray-200 hover:border-gray-400"
                    }
                  `}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* ================= PRODUCT INFORMATION ================= */}
          <div className="flex flex-col">
            {/* Category */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span>{product.category?.name}</span>
              <span>•</span>
              <span>{product.subcategory?.name}</span>
            </div>
            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            {/* Brand */}
            <p className="mt-2 text-gray-600">
              Brand:{" "}
              <span className="font-semibold text-gray-900">
                {product.brand?.name}
              </span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <span
                className="
                  bg-green-600 text-white px-2.5 py-1
                  rounded-md text-sm font-semibold
                "
              >
                ⭐ {product.rating?.average}
              </span>

              <span className="text-sm text-gray-500">
                {product.rating?.count} Ratings & Reviews
              </span>
            </div>

            <div className="border-b my-5"></div>

            {/* ================= PRICE ================= */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">

                {/* Selling Price */}
                <span className="text-3xl font-bold text-gray-900">
                  ₹
                  {product.pricing.selling_price.toLocaleString(
                    "en-IN"
                  )}
                </span>

                {/* Original Price */}
                <span className="text-lg text-gray-500 line-through">
                  ₹
                  {product.pricing.list_price.toLocaleString(
                    "en-IN"
                  )}
                </span>

                {/* Discount */}
                <span className="text-base font-bold text-green-600">
                  {product.pricing.discount_percentage}% off
                </span>
              </div>

              {product.pricing.tax_included && (
                <p className="text-sm text-gray-500 mt-2">
                  Inclusive of all taxes
                </p>
              )}
            </div>

            {/* ================= STOCK ================= */}
            <div className="mt-5">

              {product.inventory.availability === "in_stock" ? (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                  <span className="font-semibold text-green-600">
                    In Stock
                  </span>

                  <span className="text-sm text-gray-500">
                    ({product.inventory.stock} available)
                  </span>
                </div>
              ) : (
                <span className="font-semibold text-red-600">
                  Out of Stock
                </span>
              )}

              {/* Low Stock Warning */}
              {product.inventory.availability === "in_stock" &&
                product.inventory.stock <=
                  product.inventory.low_stock_threshold && (
                  <p className="text-sm text-orange-600 mt-1 font-medium">
                    Hurry! Only {product.inventory.stock} left.
                  </p>
                )}
            </div>

            {/* ================= SHORT DESCRIPTION ================= */}
            <p className="text-gray-600 leading-relaxed mt-5">
              {product.short_description}
            </p>

            {/* ================= QUANTITY ================= */}
            <div className="flex items-center gap-4 mt-6">
              <span className="font-semibold text-gray-800">
                Quantity:
              </span>

              <div className="flex items-center border rounded-lg overflow-hidden">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="
                    px-4 py-2 text-lg
                    hover:bg-gray-100
                    disabled:text-gray-300
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  −
                </button>

                <span className="px-5 py-2 border-x font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    product.inventory.availability !== "in_stock" ||
                    quantity >= product.inventory.stock
                  }
                  className="
                    px-4 py-2 text-lg
                    hover:bg-gray-100
                    disabled:text-gray-300
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  +
                </button>
              </div>
            </div>

            {/* ================= ACTION BUTTONS ================= */}
            <div className="flex flex-col sm:flex-row gap-4 mt-7">

              <button
                type="button"
                disabled={
                  product.inventory.availability !== "in_stock"
                }
                className="
                  flex-1 bg-yellow-500 hover:bg-yellow-600
                  disabled:bg-gray-300 disabled:cursor-not-allowed
                  text-white font-bold py-3.5 rounded-xl
                  transition-all duration-300
                "
                onClick={()=>addToCart(product.id)}
              >
                Add to Cart
              </button>

              <button
                type="button"
                disabled={
                  product.inventory.availability !== "in_stock"
                }
                className="
                  flex-1 bg-orange-600 hover:bg-orange-700
                  disabled:bg-gray-300 disabled:cursor-not-allowed
                  text-white font-bold py-3.5 rounded-xl
                  transition-all duration-300
                "
              >
                Buy Now
              </button>
            </div>

            {/* ================= SHIPPING ================= */}
            <div className="mt-7 border rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">
                Delivery & Shipping
              </h3>

              <div className="space-y-2 text-sm text-gray-600">

                <p>
                  🚚{" "}
                  <span className="font-medium text-gray-900">
                    {product.shipping.free_shipping
                      ? "Free Shipping"
                      : `₹${product.shipping.shipping_charge} Shipping`}
                  </span>
                </p>

                <p>
                  📦 Estimated delivery:{" "}
                  <span className="font-medium text-gray-900">
                    {product.shipping.estimated_delivery_days} days
                  </span>
                </p>

                <p>
                  📍 Ships from:{" "}
                  <span className="font-medium text-gray-900">
                    {product.shipping.ships_from}
                  </span>
                </p>

                {product.shipping.cod_available && (
                  <p>💵 Cash on Delivery Available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT DETAILS ================= */}
      <div
        className="
          max-w-7xl mx-auto mt-6 bg-white rounded-2xl
          shadow-sm border p-5 sm:p-8
        "
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          Product Details
        </h2>

        <p className="text-gray-600 leading-7">
          {product.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">SKU</p>
            <p className="font-semibold mt-1">{product.sku}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-semibold mt-1">
              {product.category?.name}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Subcategory</p>
            <p className="font-semibold mt-1">
              {product.subcategory?.name}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Return Policy</p>

            <p className="font-semibold mt-1">
              {product.return_policy?.returnable
                ? `${product.return_policy.return_window_days} Days Return`
                : "Non-returnable"}
            </p>
          </div>
        </div>

        {/* ================= WARRANTY ================= */}
        {product.warranty?.available && (
          <div className="mt-6 p-4 rounded-xl border bg-blue-50">
            <h3 className="font-bold text-gray-900">
              🛡️ Warranty
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {product.warranty.period_months} months{" "}
              {product.warranty.type}
            </p>
          </div>
        )}
      </div>

      {/* ================= SELLER ================= */}
      <div
        className="
          max-w-7xl mx-auto mt-6 bg-white rounded-2xl
          shadow-sm border p-5 sm:p-8
        "
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Seller Information
        </h2>

        <div
          className="
            flex flex-col sm:flex-row sm:items-center
            sm:justify-between gap-4
          "
        >
          <div>
            <p className="font-bold text-gray-900">
              {product.seller?.name}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {product.seller?.fulfilled_by}
            </p>
          </div>

          <div className="flex items-center gap-2">

            <span
              className="
                bg-green-100 text-green-700 px-3 py-1
                rounded-lg font-semibold
              "
            >
              ⭐ {product.seller?.rating}
            </span>

            {product.seller?.verified && (
              <span className="text-sm text-blue-600 font-semibold">
                ✓ Verified Seller
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= TAGS ================= */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="flex flex-wrap gap-2">
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="
                px-3 py-1 bg-gray-100 text-gray-600
                rounded-full text-sm
              "
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;