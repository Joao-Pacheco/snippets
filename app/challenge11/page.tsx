"use client";

import { useCallback, useEffect, useState } from "react";

/* 

Debounce de 500ms

Simular requisição com setTimeout e Promise

Mostrar sugestões abaixo do input

Cancelar a busca anterior se o usuário digitar novamente 

Consome uma API de usuários; - ok

Exibe uma lista com nome, e-mail e empresa de cada usuário;  - ok

Permite filtrar usuários por nome; - ok

Permite ordenar por nome ou empresa; - ok

Permite remover um usuário da lista (sem afetar a API).

https://jsonplaceholder.typicode.com/users

*/

interface ListOfUsersProps {
  users: any;
  removeFromList: (id: number) => void;
}

const ListOfUsers: React.FC<ListOfUsersProps> = ({ users, removeFromList }) => {
  return (
    <ul>
      {users.map((user: any) => (
        <li key={user.id}>
          name: <b>{user.name}</b>
          <br />
          company: {user.company.name}
          <br />
          e-mail: {user.email}
          <br />
          <button onClick={() => removeFromList(user.id)}>Remove</button>
          <br />
          <br />
          <br />
        </li>
      ))}
    </ul>
  );
};

export default function Challenge11() {
  const [usersList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value);
  };

  const filterComparator = useCallback(
    (user: any) => {
      return user.name.toLowerCase().includes(searchInput.toLowerCase());
    },
    [searchInput]
  );

  const orderByCompany = (e: any) => {
    e.preventDefault();
    const userListOderded = [...usersList].sort((a: any, b: any) =>
      a.company.name.localeCompare(b.company.name)
    );
    setUserList(userListOderded);
  };

  const orderByName = (e: any) => {
    e.preventDefault();
    const userListOderded = [...usersList].sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
    setUserList(userListOderded);
  };

  const removeFromList = (id: any) => {
    const newListUsers = [...usersList].filter((user: any) => user.id != id);
    setUserList(newListUsers);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseListUsers = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!responseListUsers.ok) {
          throw new Error("Error fetching for users");
        }
        const listUsers = await responseListUsers.json();
        console.log(listUsers);
        setUserList(listUsers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <button onClick={orderByCompany}>Order by company</button>
      <br />

      <button onClick={orderByName}>Order by name</button>
      <br />
      <input value={searchInput} onChange={handleSearchInput} />
      <br />
      <ListOfUsers
        removeFromList={removeFromList}
        users={usersList.filter((user: any) => filterComparator(user))}
      />
    </div>
  );
}
