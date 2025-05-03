"use client";
import { useEffect, useState } from "react";

const Challenge4 = () => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    const call = async () => {
      try {
        const response = await fetch("/");
        const data = await response.json();
      } catch (e) {
        console.log(e);
      }
    };
  });

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite para buscar..."
        className="w-full px-3 py-2 border rounded mb-4"
      />

      <p>
        <strong>Texto ao vivo:</strong> {input}
      </p>
      <p>
        <strong>Texto com debounce:</strong> {debouncedInput}
      </p>
    </div>
  );
};

export default Challenge4;

export function useDebounce<T>(value: T, delay: number) {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounce(value), delay);
    return () => clearInterval(timer);
  }, [value, delay]);

  return debounce;
}
