import React from "react";
import { Transition } from "react-spring/renderprops";

export const ItemList = ({ items }) => {
  const arr = Object.values(items);

  return (
    <ul>
      <Transition
        items={arr}
        initial={null}
        keys={({ productName }) => productName}
        from={{ fontSize: 0, opacity: 0 }}
        enter={{ fontSize: 18, opacity: 1 }}
        leave={{ fontSize: 0, opacity: 0 }}
      >
        {({ productName, productQty }) =>
          (styleProps) =>
            (
              <li key={productName} style={styleProps}>
                {generateProductText(productName, productQty)}
              </li>
            )}
      </Transition>
    </ul>
  );
};

export const generateProductText = (itemName, quantity) => {
  return `${itemName} - Quantity : ${quantity}`;
};
