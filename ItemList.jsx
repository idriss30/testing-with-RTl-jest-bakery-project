import React from "react";

export const ItemList = ({ items }) => {
  const arr = Object.values(items);

  return (
    <ul>
      {arr.map((item, index) => {
        return (
          <li key={index}>
            {generateProductText(item.productName, item.productQty)}
          </li>
        );
      })}
    </ul>
  );
};

export const generateProductText = (itemName, quantity) => {
  return `${itemName} - Quantity : ${quantity}`;
};
