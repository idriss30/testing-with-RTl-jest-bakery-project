import React from "react";

export const ItemList = ({ items }) => {
  return (
    <ul>
      {Object.entries(items).map(([itemName, quantity]) => {
        return (
          <li key={itemName}>
            {itemName} - Quantity : {quantity}
          </li>
        );
      })}
    </ul>
  );
};
