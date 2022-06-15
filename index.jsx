import ReactDom from "react-dom/client";
import React from "react";
import { App } from "./App.jsx";

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(<App />);
