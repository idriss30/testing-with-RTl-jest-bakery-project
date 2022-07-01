import React from "react";
import { render } from "@testing-library/react";
import { ItemList } from "./ItemList.jsx";

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
    expect(getByText("cheesecake - Quantity : 3")).toBeInTheDocument();
    expect(getByText("danish - Quantity : 5")).toBeInTheDocument();
    expect(getByText("croissant - Quantity : 20")).toBeInTheDocument();
  });
});
