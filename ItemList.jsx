import React from "react";

export const ItemList = ({ items }) => {
  const arr = Object.values(items);

  return (
    <ul>
      {arr.map((item, index) => {
        return (
          <li key={index}>
            {item.productName} - Quantity : {item.productQty}
          </li>
        );
      })}
    </ul>
  );
};
