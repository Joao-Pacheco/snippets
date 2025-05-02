"use client";
import { promises } from "dns";
import { useState } from "react";

const Challenge2 = () => {
  const list = ["Ana", "João", "Carlos"];
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <input value={search} onChange={handleChange} />
      <ul>
        {list.map((value) => (
          <li key={value}>
            {value.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !=
              -1 && search != "" ? (
              <b>{value}</b>
            ) : (
              value
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Challenge2;
