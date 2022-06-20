import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { App } from "./App.jsx";

// makinkg sure to configure environment to be true so i could use act with react18
beforeAll(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
});

test("checking if proper header is displayed", () => {
  const { getByText } = render(<App />);
  expect(getByText("Inventory Content")).toBeInTheDocument();
});

test("increment button danish", () => {
  const { getByText } = render(<App />);

  expect(getByText("Danish, 0")).toBeInTheDocument();
  const button = getByText("Increment danish");

  fireEvent.click(button);

  expect(getByText("Danish, 1")).toBeInTheDocument();
});
