import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import Card from "../Card/Card";
import styles from "./Cars.module.css";

interface Object {
  id: number;
  name: string;
  model: string;
  title: string;
  year: number;
  price: number;
}

export default function Cars() {
  const [state, setState] = useState<Object[]>([]);
  const [sortBy, setSortBy] = useState<"year" | "price">("year");

  useEffect(() => {
    axios
      .get<Object[]>("https://test.tspb.su/test-task/vehicles")
      .then((response: AxiosResponse) => {
        setState(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }, []);

  const sortState = (key: "year" | "price") => {
    setSortBy(key);
    const sortedObjects = [...state].sort((a, b) => a[key] - b[key]);
    setState(sortedObjects);
  };

  return (
    <>
      <div className={styles.btnGroup} role="group">
        <button
          type="button"
          className={`btn btn-outline-primary ${
            sortBy === "year" ? "active" : ""
          }`}
          onClick={() => sortState("year")}
        >
          Sort by year
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ${
            sortBy === "price" ? "active" : ""
          }`}
          onClick={() => sortState("price")}
        >
          Sort by price
        </button>
      </div>
      <div className={styles.cardDeck}>
        {state.map((object) => (
          <Card key={object.id} object={object} />
        ))}
      </div>
    </>
  );
}
