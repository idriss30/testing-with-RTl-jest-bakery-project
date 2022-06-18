import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import React from "react";
import { App } from "./App.jsx";
import { screen, fireEvent } from "@testing-library/dom";

// makinkg sure to configure environment to be true so i could use act with react18
beforeAll(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
});

test("checking if proper header is displayed", () => {
  render(<App />);

  expect(screen.getByText("Inventory Contents")).toBeTruthy();
});

test("increment button danish", () => {
  render(<App />);
  const button = screen.getByText("Increment danish");

  act(() => {
    fireEvent.click(button);
  });

  expect(screen.getByText("Danish, 1")).toBeInTheDocument();
});
