import { act } from "react-dom/test-utils";
import React from "react";
import ReactDom from "react-dom/client";
import { App } from "./App.jsx";

const container = document.createElement("div");
container.setAttribute("id", "app");
document.body.appendChild(container);
const root = ReactDom.createRoot(container);

// makinkg sure to configure environment to be true so i could use act with react18
beforeAll(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
});

test("checking if proper header is displayed", () => {
  act(() => {
    root.render(<App />);
  });
  const header = document.querySelector("h1");
  expect(header.textContent).toBe("Inventory Contents");
});
