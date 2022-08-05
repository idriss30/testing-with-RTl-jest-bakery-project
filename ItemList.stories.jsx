import React, { useState } from "react";
import { ItemList } from "./ItemList";

export default {
  title: "ItemList",
  component: ItemList,
  includeStories: ["staticList", "animatedFunction"],
};

export const staticList = () => {
  const itemsToRender = [
    { productName: "cheesecake", productQty: 4 },
    { productName: "danish", productQty: 10 },
    { productName: "croissant", productQty: 2 },
    { productName: "macaroons", productQty: 7 },
  ];
  return <ItemList items={itemsToRender} />;
};

export const animatedFunction = () => {
  const initialList = [
    { productName: "cheesecake", productQty: 4 },
    { productName: "danish", productQty: 10 },
    { productName: "croissant", productQty: 2 },
  ];

  const StateFulLComponent = () => {
    const [list, setList] = useState(initialList);
    const add = () =>
      setList([...list, { productName: "macaroons", productQty: 90 }]);
    const reset = () => setList(initialList);

    return (
      <>
        <ItemList items={list} />
        <button onClick={add}>Add Item</button>
        <button onClick={reset}>Reset</button>
      </>
    );
  };

  return <StateFulLComponent />;
};
