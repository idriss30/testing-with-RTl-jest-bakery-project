import fs from "fs";
import os from "os";
import { generateTextReport } from "./generateReport.js";

const path = `${os.tmpdir()}\\report.txt`;

beforeEach(() => {});

test("generate a .txt report", () => {
  const elements = [
    { item: "cheesecake", quantity: 20, price: 5 },
    { item: "danish", quantity: 50, price: 3 },
    { item: "croissant", quantity: 500, price: 6 },
  ];

  generateTextReport(elements);
  const content = fs.readFileSync(path, "utf-8");
  expect(content).toMatchSnapshot();
});
