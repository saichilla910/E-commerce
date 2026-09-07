import { useParams } from "react-router-dom";
import DisplayProducts from './DisplayProducts'

const ProductCategory = ({ products }) => {
  const { category } = useParams();

  const categoryWiseProducts = products.filter(
    (product) =>
      product.category?.name?.toLowerCase() ===
      category.toLowerCase()
  );
  console.log("categorywise",categoryWiseProducts)

  return (
    <DisplayProducts products={categoryWiseProducts} />
  );
};

export default ProductCategory;