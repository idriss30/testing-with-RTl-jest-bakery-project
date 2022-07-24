import React from "react";
import { App } from "./App.jsx";
import nock from "nock";
import { API_ADDR } from "./apiaddress.js";
import { generateProductText } from "./itemList.jsx";

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
jest.mock("react-spring/renderprops");

beforeEach(() => {
  nock(API_ADDR)
    .get("/inventory/")
    .reply(200, [
      { productName: "cheesecake", productQty: 2 },
      { productName: "croissant", productQty: 5 },
      { productName: "macaroon", productQty: 96 },
    ]);
});

afterEach(async () => {
  await waitFor(() => {
    if (!nock.isDone()) {
      nock.cleanAll();
      throw new Error("inventory route not reached");
    }
  });
});

test("renders the appropriate header", async () => {
  render(<App />);
  expect(await screen.findByText(/inventory Content/i)).toBeInTheDocument();
});

test("rendering the server's list of items", async () => {
  render(<App />);

  await waitFor(async () => {
    expect(
      await screen.findByText(generateProductText("cheesecake", 2))
    ).toBeInTheDocument();
  });
  const ul = document.querySelector("ul");
  expect(ul.children).toHaveLength(3);
  expect(
    await screen.findByText(generateProductText("croissant", 5))
  ).toBeInTheDocument();
  expect(
    await screen.findByText(generateProductText("macaroon", 96))
  ).toBeInTheDocument();
});

test("update state with new list items", async () => {
  render(<App />);

  //mock the request
  nock(API_ADDR)
    .post("/inventory/danish")
    .reply(201, { message: "danish was added to inventory" });

  // get inputs
  const prodName = screen.getByPlaceholderText("add itemname");
  const prodQty = screen.getByPlaceholderText("add quantity");
  const button = screen.getByText("Push item to inventory");

  // wait for  nock first interceptor to intercept the request

  await waitFor(async () => {
    expect(
      await screen.findByText(generateProductText("cheesecake", 2))
    ).toBeInTheDocument();
  });

  // fireEvent
  fireEvent.change(prodName, { target: { value: "danish" } });
  fireEvent.change(prodQty, { target: { value: 100 } });
  fireEvent.click(button);

  // wait for second interceptor Event
  await waitFor(async () => {
    expect(
      await screen.findByText(generateProductText("danish", 100))
    ).toBeInTheDocument();
  });

  const ul = document.querySelector("ul");
  expect(ul.childElementCount).toBe(4);

  expect(
    await screen.findByText(generateProductText("croissant", 5))
  ).toBeInTheDocument();
  expect(
    await screen.findByText(generateProductText("macaroon", 96))
  ).toBeInTheDocument();
});

test("testing action log snapshot when loading initial inventory", async () => {
  jest
    .spyOn(Date.prototype, "toISOString")
    .mockReturnValue("Sun, 24 Jul 2022 10:53:07 GMT");

  const { getByTestId } = render(<App />);
  await waitFor(() => {
    const ul = document.querySelector("ul");
    expect(ul.childElementCount).toBe(3);
  });

  const actionLog = getByTestId("action-log");
  expect(actionLog).toMatchSnapshot();
});
