"use client";

/* Debounce de 500ms

Simular requisição com setTimeout e Promise

Mostrar sugestões abaixo do input

Cancelar a busca anterior se o usuário digitar novamente */

import { ChangeEvent, useEffect, useRef, useState } from "react";

interface ResponseFetchFake {
  id: number;
  text: string;
}

export default function Challenge10() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [listAutoComplete, setListAutoComplete] = useState<ResponseFetchFake[]>(
    []
  );
  const timeToReturnFecth = 1000;
  const delayDebounce = 500;

  const fetchAutoCompleteTerms = (
    term: string
  ): Promise<ResponseFetchFake[]> => {
    return new Promise((resolve) => {
      if (!term) {
        resolve([]);
        return;
      }
      setTimeout(() => {
        const fakeData: ResponseFetchFake[] = [
          { id: 1, text: "teste " + Math.floor(Math.random() * 10) },
          { id: 2, text: "teste " + Math.floor(Math.random() * 10) },
          { id: 3, text: "teste " + Math.floor(Math.random() * 10) },
          { id: 4, text: "teste " + Math.floor(Math.random() * 10) },
        ];
        resolve(fakeData);
      }, timeToReturnFecth);
    });
  };

  const debounce = (
    fn: (searchTerm: string) => Promise<ResponseFetchFake[]>,
    delay: number
  ) => {
    let timeout: NodeJS.Timeout;
    return (searchTerm: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(
        () => fn(searchTerm).then(setListAutoComplete),
        delay
      );
    };
  };

  const debouncedFetch = useRef(
    debounce(fetchAutoCompleteTerms, delayDebounce)
  ).current;

  useEffect(() => {
    debouncedFetch(searchTerm);
  }, [searchTerm]);

  const handlerSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={handlerSearch}
        placeholder="Search here"
      />
      {listAutoComplete && (
        <ul>
          {listAutoComplete.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
