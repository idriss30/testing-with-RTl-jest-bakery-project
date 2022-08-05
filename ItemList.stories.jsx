import React from "react";
import { ItemList } from "./ItemList";
import { withKnobs, object } from "@storybook/addon-knobs";

export default {
  title: "ItemList",
  component: ItemList,
  includeStories: ["staticList", "animatedFunction"],
  decorators: [withKnobs],
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
  const knobLabel = "Contents";
  const knobDefaultValue = [
    { productName: "cheesecake", productQty: 4 },
    { productName: "danish", productQty: 10 },
    { productName: "croissant", productQty: 2 },
  ];

  const itemList = object(knobLabel, knobDefaultValue);
  return <ItemList itemList={itemList} />;
};
