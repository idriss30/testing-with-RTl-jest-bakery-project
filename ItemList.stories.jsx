import React from "react";
import { ItemList } from "./ItemList";

export default {
  title: "ItemList",
  component: ItemList,
  includeStories: ["staticList", "animate"],
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

export const animate = (args) => {
  return <ItemList {...args} />;
};

animate.args = {
  items: [
    { productName: "cheesecake", productQty: 4 },
    { productName: "danish", productQty: 10 },
  ],
};
