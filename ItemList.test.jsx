import React from "react";
import { render } from "@testing-library/react";
import { ItemList } from "./ItemList.jsx";

describe("testing ItemsListComponents", () => {
  test("render list of items with ItemList", () => {
    const items = {
      cheesecake: 3,
      danish: 5,
      croissant: 20,
    };
    const { getByText } = render(<ItemList items={items} />);
    const nodeList = document.querySelector("ul");
    expect(nodeList.childElementCount).toBe(3);
    expect(getByText("cheesecake - Quantity : 3")).toBeInTheDocument();
    expect(getByText("danish - Quantity : 5")).toBeInTheDocument();
    expect(getByText("croissant - Quantity : 20")).toBeInTheDocument();
  });
});
