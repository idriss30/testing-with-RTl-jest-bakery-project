import React from "react";
import { App } from "./App.jsx";
import nock from "nock";
import { API_ADDR } from "./apiaddress.js";

import { render, screen, waitFor } from "@testing-library/react";

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
  render(<App />);

  await waitFor(() => {
    const ul = document.querySelector("ul");
    expect(ul.childElementCount).toBe(3);
  });

  expect(
    await screen.findByText("cheesecake - Quantity : 2")
  ).toBeInTheDocument();
  expect(
    await screen.findByText("croissant - Quantity : 5")
  ).toBeInTheDocument();
  expect(
    await screen.findByText("macaroon - Quantity : 96")
  ).toBeInTheDocument();
});
