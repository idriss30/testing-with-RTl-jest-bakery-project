import React from "react";
import { render } from "@testing-library/react";
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
