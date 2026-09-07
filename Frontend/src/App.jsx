import { useState } from "react";
import DisplayProducts from "./ProductsComponents/DisplayProducts";
import LoadingProducts from "./ProductsComponents/LoadingProducts";
import Header from "./Header";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import ProductDetail from "./ProductsComponents/ProductDetail";
import ProductCategory from "./ProductsComponents/ProductCategory";
import Cart from './ProductsComponents/CartComponents/Cart'
import { useNavigate } from "react-router-dom";
import MainAccount from "./Accounts/MainAccount";
import Wishlist from "./WishList/Wishlist";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [category,setcategory]=useState();
  const [cartItem,setCartItem]=useState([]);

  const navigate=useNavigate();

  //function for the searching for the products in the products bundle
  const addToCart=(id)=>{
    const product=products.find((product)=>
    product.id==id)
    console.log(product)
   if (product) {
  setCartItem((previousItems) => [
    ...previousItems,
    product
  ]);
  navigate('cart')
}

  }


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
      product.tags?.some((tag) => tag.toLowerCase().includes(search))
    );
  });
  console.log(products);
  return (
     <>
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        category={category}
        setcategory={setcategory}
      />

      <LoadingProducts
        setProducts={setProducts}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />

      <Routes>
        <Route
          path="/"
          element={
            <DisplayProducts
              products={filteredProducts.filter((product) =>
                product.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail products={products} addToCart={addToCart} />}
        />
        <Route
          path="/products/category/:category"
          element={<ProductCategory products={products} setProducts={setProducts} searchValue={searchValue} />}
        />
        <Route 
        path='/cart'
        element={<Cart cartItem={cartItem}></Cart>}
        />
        <Route 
        path="/account"
        element={<MainAccount />} />
      
      <Route 
        path="/wish-list"
        element={<Wishlist />}
         />
      </Routes>
    </>
      
  );
}

export default App;
