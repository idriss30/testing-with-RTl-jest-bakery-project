import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { App } from "./App.jsx";

test("checking if proper header is displayed", () => {
  const { getByText } = render(<App />);
  expect(getByText("Inventory Content")).toBeInTheDocument();
});
