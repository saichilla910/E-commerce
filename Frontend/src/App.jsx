import { useState } from "react";
import DisplayProducts from "./ProductsComponents/DisplayProducts";
import LoadingProducts from "./ProductsComponents/LoadingProducts";
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(products)
  return (
    <>
      <LoadingProducts
        setProducts={setProducts}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />
      {!loading && !error && (
        <DisplayProducts products={products} />
      )}
    </>
  );
}

export default App;