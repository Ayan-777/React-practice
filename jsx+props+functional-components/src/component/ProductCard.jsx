import { useState } from "react";

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
const finalPrice = product.price - (product.price * (product.discountPercentage / 100));

  return (
    <div>
      <h3>Product Name: {product.title}</h3>
      <p>Price: {product.price}</p>
      <p>Discount: {product.discountPercentage}%</p>
      <p>Rating: {product.rating}</p>
      <button
        onClick={() => {
          if (quantity < 10) {
            setQuantity(quantity + 1);
          }
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
      >
        -
      </button>
      <p>{quantity}</p>

      <h3>Total :{(finalPrice * quantity).toFixed(2)}</h3>

      {product.stock ? (
        <button
          onClick={() => onAddToCart(product, quantity)}
        >
          Buy Now
        </button>
      ) : (
        <button disabled>Out of Stock</button>
      )}
    </div>
  );
}

export default ProductCard;
