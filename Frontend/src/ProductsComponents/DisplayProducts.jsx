import ProductCard from "./ProductCard";

const DisplayProducts = ({ products }) => {
  console.log("Display products");

  return (
    <div className="w-full">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-40 mr-40 mt-4">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-xl font-semibold text-gray-600">
          No Products Found
        </h1>
      )}
    </div>
  );
};

export default DisplayProducts;