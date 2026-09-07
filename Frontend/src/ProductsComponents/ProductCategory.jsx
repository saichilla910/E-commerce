import { useParams } from "react-router-dom";
import DisplayProducts from './DisplayProducts'



const ProductCategory = ({ products,searchValue }) => {
  const { category } = useParams();

  

  const categoryWiseProducts = products.filter(
    (product) =>
      product.category?.name?.toLowerCase() ===
      category.toLowerCase()
  );
  console.log("categorywise",categoryWiseProducts)

  const filteredProducts = categoryWiseProducts.filter((product) => {
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

  return (
    <DisplayProducts products={filteredProducts} />
  );
};

export default ProductCategory;