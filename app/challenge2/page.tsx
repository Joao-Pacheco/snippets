"use client";
import { useState } from "react";

const Challenge2 = () => {
  const list = ["Ana", "João", "Carlos"];
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const normalizedSearch = search.toLowerCase();

  const highlightMatch = (name: string) => {
    const lowerName = name.toLowerCase();
    const index = lowerName.indexOf(normalizedSearch);

    if (index === -1 || search === "") return name;

    return (
      <>
        {name.slice(0, index)}
        <b className="bg-yellow-200">
          {name.slice(index, index + search.length)}
        </b>
        {name.slice(index + search.length)}
      </>
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <input
        value={search}
        onChange={handleChange}
        placeholder="Filtrar nomes..."
        className="w-full px-3 py-2 border rounded mb-4"
      />
      <ul className="space-y-2">
        {list
          .filter((name) => name.toLowerCase().includes(normalizedSearch))
          .map((name) => (
            <li key={name} className="text-lg">
              {highlightMatch(name)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Challenge2;
