/* Crie um pequeno dashboard em React que:

Consome uma API de usuários;

Exibe uma lista com nome, e-mail e empresa de cada usuário;

Permite filtrar usuários por nome;

Permite ordenar por nome ou empresa;

Permite remover um usuário da lista (sem afetar a API).

 */

"use client";
import { useEffect, useState } from "react";

const Challenge5 = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const sortByName = () => {
    const data = [...users].sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
    setUsers(data);
  };

  const sortByCompany = () => {
    const data = [...users].sort((a: any, b: any) =>
      a.company.name.localeCompare(b.company.name)
    );
    setUsers(data);
  };

  const removeFromList = (index: number) => {
    const newArray = [...users];
    newArray.splice(index, 1);
    setUsers(newArray);

    /* or by id 

    const filtered = users.filter(user => user.id !== id);
    setUsers(filtered); */
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Faled to fetch users");
        }

        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error("error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
      </div>
      <br />
      <br />
      <input value="sort by name" onClick={sortByName} type="button" />
      <br />
      <br />
      <input value="sort by Company" onClick={sortByCompany} type="button" />
      <br />
      <br />

      <ul>
        {users
          .filter((a: any) =>
            a.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((user: any, index: number) => (
            <li key={user.id} onClick={() => removeFromList(index)}>
              Name: {user.name} <br />
              E-mail: {user.email}
              <br />
              Company:{user.company.name}
              <br />
              <br />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Challenge5;
