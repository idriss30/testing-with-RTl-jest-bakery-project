import React from "react";
import nock from "nock";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { addingItemRequest, Form } from "./Form.jsx";
import { API_ADDR } from "./apiaddress.js";

describe("testing form inputs features", () => {
  test("render form properly", () => {
    const { getByText, getByPlaceholderText } = render(<Form />);
    expect(getByPlaceholderText("add itemname")).toBeInTheDocument();
    expect(getByPlaceholderText("add quantity")).toBeInTheDocument();
    expect(getByText("Push item to inventory")).toBeInTheDocument();
  });

  test("testing addingRequest function", async () => {
    render(<form />);
    nock(API_ADDR)
      .post("/inventory/danish")
      .reply(201, { message: "danish was added to inventory" });

    const response = await addingItemRequest("danish", 2);
    expect(response).toEqual({ message: "danish was added to inventory" });
    expect(nock.isDone()).toBe(true);
  });
  test("add item through form", async () => {
    const { getByText, getByPlaceholderText } = render(<Form />);
    nock(API_ADDR)
      .post("/inventory/croissant")
      .reply(201, { message: "croissant was added to inventory" });
    fireEvent.change(getByPlaceholderText("add itemname"), {
      target: {
        value: "croissant",
      },
    });

    fireEvent.change(getByPlaceholderText("add quantity"), {
      target: {
        value: 2,
      },
    });
    fireEvent.click(getByText("Push item to inventory"));

    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });
  });
});

test("test involving onAddedItems", async () => {
  nock(`${API_ADDR}`)
    .post("/inventory/croissant")
    .reply(201, { message: "croissant was added to inventory" });

  const onAddedItems = jest.fn();
  render(<Form onItemAdded={onAddedItems} />);

  const itemName = screen.getByPlaceholderText("add itemname"),
    itemQty = screen.getByPlaceholderText("add quantity");

  fireEvent.change(itemName, { target: { value: "croissant" } });
  fireEvent.change(itemQty, { target: { value: 20 } });

  fireEvent.click(screen.getByText("Push item to inventory"));

  await waitFor(() => {
    expect(nock.isDone()).toBe(true);
  });
  expect(onAddedItems).toHaveBeenCalledWith("croissant", "20");
  expect(onAddedItems).toHaveBeenCalledTimes(1);
});
