"use client";
import { useState } from "react";

const Challenge1 = () => {
  const [name, setName] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", name);
  };

  const isValid = name.length >= 3;

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-1 font-semibold">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <div className={isValid ? "text-green-600" : "text-red-600"}>
          {isValid ? "Texto válido" : "Erro: texto muito curto"}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Submit
        </button>
      </form>
      {name && <h1 className="mt-4 text-center text-xl">Olá, {name}!</h1>}
    </div>
  );
};

export default Challenge1;
