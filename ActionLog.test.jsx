import React from "react";
import { render, screen } from "@testing-library/react";
import { ActionLog } from "./ActionLog.jsx";

test("testing action log functions", () => {
  const dayToMs = (days) => days * 24 * 60 * 60 * 10000;
  const actions = [
    {
      time: new Date(dayToMs(1)),
      message: "initial inventory loaded",
      data: { cheesecake: 2, danish: 100, croissant: 30 },
    },
    {
      time: new Date(dayToMs(2)),
      message: "added chocolate-croissant",
      data: { "chocolate-croissant": 30 },
    },
    {
      time: new Date(dayToMs(2)),
      message: "item removed",
      data: { croissant: 20 },
    },
  ];
  const { container } = render(<ActionLog actions={actions} />);
  expect(container).toMatchSnapshot();
});
