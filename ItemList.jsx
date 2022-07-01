import React from "react";

export const ItemList = ({ items }) => {
  const arr = Object.entries(items);

  return (
    <ul>
      {arr.map(([index, product]) => {
        return (
          <li key={index}>
            {product.productName} - Quantity : {product.productQty}
          </li>
        );
      })}
    </ul>
  );
};
