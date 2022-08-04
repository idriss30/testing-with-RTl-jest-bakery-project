import React from "react";
import { render, screen } from "@testing-library/react";
import { ItemList, generateProductText } from "./ItemList.jsx";

jest.mock("react-spring/renderprops");

describe("testing ItemsListComponents", () => {
  test("render list of items with ItemList", () => {
    const items = [
      { productName: "cheesecake", productQty: 3 },
      { productName: "danish", productQty: 5 },
      { productName: "croissant", productQty: 20 },
    ];
    const { getByText } = render(<ItemList items={items} />);
    const nodeList = document.querySelector("ul");
    expect(nodeList.childElementCount).toBe(3);
    expect(getByText(generateProductText("cheesecake", 3))).toBeInTheDocument();
    expect(getByText(generateProductText("danish", 5))).toBeInTheDocument();
    expect(getByText(generateProductText("croissant", 20))).toBeInTheDocument();
  });

  test("generate text from function generateProductTest", () => {
    const response = generateProductText("cheesecake", 3);
    expect(response).toBe("cheesecake - Quantity : 3");
  });
});

test("testing style for items that are less or equal to 5", () => {
  const itemsTorender = [
    { productName: "cheesecake", productQty: 4 },
    { productName: "danish", productQty: 10 },
    { productName: "croissant", productQty: 2 },
  ];
  render(<ItemList items={itemsTorender} />);

  const cheesecake = screen.getByText(generateProductText("cheesecake", 4));
  const croissant = screen.getByText(generateProductText("croissant", 2));

  expect(cheesecake).toHaveStyle({ color: "crimson", fontWeight: "bold" });
  expect(croissant).toHaveStyle({ color: "crimson", fontWeight: "bold" });
});
