import { useState } from "react";
import DisplayProducts from "./ProductsComponents/DisplayProducts";
import LoadingProducts from "./ProductsComponents/LoadingProducts";
import Header from "./Header";
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const filteredProducts = products.filter((product) => {
  const search = searchValue.trim().toLowerCase();

  if (!search) return true;

  return (
    product.name?.toLowerCase().includes(search) ||
    product.description?.toLowerCase().includes(search) ||
    product.short_description?.toLowerCase().includes(search) ||
    product.brand?.name?.toLowerCase().includes(search) ||
    product.brand?.slug?.toLowerCase().includes(search) ||
    product.category?.name?.toLowerCase().includes(search) ||
    product.category?.slug?.toLowerCase().includes(search) ||
    product.subcategory?.name?.toLowerCase().includes(search) ||
    product.subcategory?.slug?.toLowerCase().includes(search) ||
    product.sku?.toLowerCase().includes(search) ||
    product.slug?.toLowerCase().includes(search) ||
    product.tags?.some((tag) =>
      tag.toLowerCase().includes(search)
    )
  );
});
  console.log(products)
  return (
    <>
    <Header searchValue={searchValue}
    setSearchValue={setSearchValue}></Header>
      <LoadingProducts
        setProducts={setProducts}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />
      {!loading && !error && (
        <DisplayProducts 
        products={filteredProducts.
filter((product) =>product.name.toLowerCase().includes(searchValue.toLowerCase()))
        }
         />
      )}
    </>
  );
}

export default App;