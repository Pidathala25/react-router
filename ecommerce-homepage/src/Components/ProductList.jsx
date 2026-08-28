import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  return (
    <section>
      <h2>Our Products</h2>

      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;