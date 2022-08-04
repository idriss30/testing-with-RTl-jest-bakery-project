/* @jsx jsx */
import React from "react";
import { Transition } from "react-spring/renderprops";
import { css, jsx, keyframes } from "@emotion/react";

export const ItemList = ({ items }) => {
  const arr = Object.values(items);

  const pulsate = keyframes`
   0% { opacity:0}
   50% {opacity:.5}
   100%{opacity:1}
  `;

  const outOfStock = css`
    font-weight: bold;
    color: crimson;
    animation: ${pulsate} 3s linear infinite;
  `;

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
              <li
                key={productName}
                style={styleProps}
                css={productQty <= 5 ? outOfStock : null}
              >
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
