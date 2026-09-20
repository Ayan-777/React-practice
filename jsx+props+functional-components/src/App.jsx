import { useState, useEffect } from "react";
import ProductCard from "./component/ProductCard";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        let res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error(`Http error : ${res.status}`);
        }

        let data = await res.json();
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch Proudcts :", error.message);
      }
    };
    fetchingData();
  }, []);

  function addToCart(product, quantity) {
    setCart((previtem) => {
      const exitem = previtem.some((item) => item.id === product.id);

      if (exitem) {
        return previtem.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
      ...previtem,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
      },
    ];
    });
  }

  const filteredProducts = products.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return <h1>Loading products...</h1>;
  }

  return (
    <div>
      <header style={{ padding: "10px", background: "#333", color: "#fff" }}>
        <h2>Store | 🛒 Cart: {cart.length} items</h2>
      </header>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredProducts.map((item) => (
        <ProductCard key={item.id} product={item} onAddToCart={addToCart} />
      ))}
      <div>
        <h3>Cart Contents:</h3>
        {cart.map((item, index) => (
          <p key={index}>
            {item.title} - Qty : {item.quantity} - ${item.price * item.quantity}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
