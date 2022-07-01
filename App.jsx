import React, { useEffect, useRef, useState } from "react";
import { Form } from "./Form.jsx";
import { API_ADDR } from "./apiaddress.js";
import { ItemList } from "./itemList.jsx";

export const App = () => {
  const [items, setItems] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      const getItems = await fetch(`${API_ADDR}/inventory/`);

      if (isMounted) {
        setItems(await getItems.json());
      }
    };
    fetchItems();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <div>
        <h1>Inventory Content</h1>
        <h2>Add item through the Form</h2>
        <Form />
        <ItemList items={items} />
      </div>
    </>
  );
};
