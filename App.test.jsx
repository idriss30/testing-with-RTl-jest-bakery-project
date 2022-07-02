import React from "react";
import { App } from "./App.jsx";
import nock from "nock";
import { API_ADDR } from "./apiaddress.js";

import { act, render, waitFor } from "@testing-library/react";

beforeEach(() => {
  nock(API_ADDR)
    .get("/inventory/")
    .reply(200, [
      { productName: "cheesecake", productQty: 2 },
      { productName: "croissant", productQty: 5 },
      { productName: "macaroon", productQty: 96 },
    ]);
});

afterEach(() => {
  waitFor(() => {
    if (!nock.isDone()) {
      nock.cleanAll();
      throw new Error("inventory route not reached");
    }
  });
});

test("renders the appropriate header", async () => {
  const { findByText } = render(<App />);
  expect(await findByText("Inventory Content")).toBeInTheDocument();
});

test("rendering the server's list of items", async () => {
  const { getByText } = render(<App />);

  const listElement = document.querySelector("ul");
  waitFor(() => {
    expect(listElement.childElementCount).toBe(3);
    expect(getByText("cheesecake - Quantity : 2")).toBeInTheDocument();
    expect(getByText("croissant - Quantity : 5")).toBeInTheDocument();
    expect(getByText("macaroon - Quantity : 96")).toBeInTheDocument();
  });
});
