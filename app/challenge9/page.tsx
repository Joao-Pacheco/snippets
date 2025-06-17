"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./style.css";

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export default function Challenge9() {
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const fetchListOfProducts = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const responseFetchProducts = await fetch(
        `https://fakestoreapi.com/products?limit=5&page=${page}`
      );

      if (!responseFetchProducts.ok)
        throw new Error("Failed to fetch data of products");

      const productsData = await responseFetchProducts.json();

      if (productsData.length === 0) {
        setHasMore(false);
        return;
      }

      setListProducts((prev) => [...prev, ...productsData]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchListOfProducts();
        }
      },
      { threshold: 0.5 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, hasMore]);

  return (
    <div>
      <ul className="container">
        {listProducts.map((product) => (
          <li className="list" key={uuidv4()}>
            <div className="list-title">{product.title}</div>
            <div className="list-img">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="list-category">{product.category}</div>
            <div className="list-price">${product.price.toFixed(2)}</div>
          </li>
        ))}
      </ul>
      {hasMore && <div ref={observerTarget} style={{ height: "20px" }} />}
      {isLoading && <div className="loading">Loading more items...</div>}
      {!hasMore && <div className="end-message">No more products to load</div>}
    </div>
  );
}
