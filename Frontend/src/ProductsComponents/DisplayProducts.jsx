import ProductCard from './ProductCard'

const DisplayProducts = ({products}) => {
  console.log("Display products")
  return (
    <div>
       {products.length>0?(
        products.map((product)=>(
          <div key={product.id}>
          <ProductCard product={product} />
          <h1>Working fine</h1>
          </div>
        ))
       ):(
        <h1>No Products Found</h1>
       )}
    </div>
  )
}

export default DisplayProducts