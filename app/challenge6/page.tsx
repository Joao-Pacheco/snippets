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
import { useEffect, useMemo, useState } from "react";

interface product {
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
  const [products, setProducts] = useState<product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed fetching data");

      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const sortByPrince = () => {
    setIsAscending(!isAscending);
    const newArray = [...products];
    setProducts(
      newArray.sort((a: product, b: product) =>
        isAscending ? a.price - b.price : b.price - a.price
      )
    );
  };

  const removeProductFromList = (id: number) => {
    const newArray = [...products];
    setProducts(newArray.filter((product: product) => product.id != id));
  };

  const inStock = (id: number) => {
    const product = products.find((product) => product.id === id);
    if (product !== undefined) {
      const index: number = products.indexOf(product);
      const newArray = [...products];
      newArray[index].inStock =
        newArray[index].inStock === null ? true : !newArray[index].inStock;
      setProducts(newArray);
    }
  };

  const totalInStock = () =>
    useMemo(() => {
      var total = 0;
      products.forEach((product) => {
        if (product.inStock) {
          total += product.price;
        }
      });
      return total;
    }, [products]);

  return (
    <div>
      <br />
      <br />
      <div className="flex cursor">
        <input value="Sort by price" type="button" onClick={sortByPrince} />
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
          .map((item, index) => (
            <li key={index + item.title}>
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
              <input
                value="remove"
                type="button"
                onClick={() => removeProductFromList(item.id)}
              />
              <br />
              <input
                style={{ background: item.inStock ? "green" : "red" }}
                value="In Stock"
                type="button"
                onClick={() => inStock(item.id)}
              />
              <br />
              <br />
              <br />
            </li>
          ))}
      </ul>
      <div>
        Total in Stock:
        <br />
        {totalInStock()}
      </div>
    </div>
  );
};

export default Challenge5;
