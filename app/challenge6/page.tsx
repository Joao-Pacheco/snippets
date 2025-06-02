/* Build a small inventory dashboard that:

Fetches a list of products from a fake API;

Displays product name, category, and price;

Allows users to:

🔍 Filter by product name or category;

💲 Sort by price (ascending/descending toggle);

❌ Delete a product from the list;

📝 Toggle the "In Stock" status of a product;

Optional: Show a total inventory value at the bottom (sum of all in-stock products).
 */

"use client";
import { useEffect, useState } from "react";

interface Product {
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
  id: number;
  inStock?: boolean;
}

const Challenge5 = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [totalInStock, settotalInStock] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed fetching data");

      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const sortByPrice = () => {
    setIsAscending(!isAscending);
    const newArray = [...products];
    setProducts(
      newArray.sort((a: Product, b: Product) =>
        isAscending ? a.price - b.price : b.price - a.price
      )
    );
  };

  const removeProductFromList = (id: number) => {
    const newArray = [...products];
    setProducts(newArray.filter((product: Product) => product.id != id));
  };

  const inStock = (id: number) => {
    const product = products.find((product) => product.id === id);
    if (product !== undefined) {
      const index: number = products.indexOf(product);
      const newArray = [...products];
      newArray[index].inStock = newArray[index].inStock =
        !newArray[index].inStock;
      setProducts(newArray);
    }
  };

  useEffect(() => {
    var total = 0;
    products.forEach((product) => {
      if (product.inStock) {
        total += product.price;
      }
    });
    settotalInStock(total);
  }, [products]);

  return (
    <div>
      <br />
      <br />
      <div className="flex cursor">
        <button onClick={sortByPrice} /> Sort by price
        <button />
      </div>
      <br />
      <br />
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <br />
      <ul>
        {products
          .filter(
            (product) =>
              product.title.toLowerCase().includes(search.toLowerCase()) ||
              product.category.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <li key={item.id}>
              Title: {item.title}
              <br />
              <br />
              Category: {item.category}
              <br />
              <br />
              Price: {item.price}
              <br />
              <br />
              <br />
              <button onClick={() => removeProductFromList(item.id)}>
                remove
              </button>
              <br />
              <button
                style={{ background: item.inStock ? "green" : "red" }}
                onClick={() => inStock(item.id)}
              >
                In Stock
              </button>
              <br />
              <br />
              <br />
            </li>
          ))}
      </ul>
      <div>
        Total in Stock:
        <br />
        {totalInStock}
      </div>
    </div>
  );
};

export default Challenge5;
