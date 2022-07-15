import React from "react";
import { API_ADDR } from "./apiaddress.js";

export const addingItemRequest = async (itemName, quantity) => {
  const postItem = await fetch(`${API_ADDR}/inventory/${itemName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemName, quantity }),
  });

  return await postItem.json();
};

export const Form = ({ onItemAdded }) => {
  const [itemName, setItemName] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    await addingItemRequest(itemName, quantity);
    if (onItemAdded) onItemAdded(itemName, quantity);
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="add itemname"
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="add quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button>Push item to inventory</button>
      </form>
    </>
  );
};
