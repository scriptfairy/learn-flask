import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

document.body.innerHTML = '<div id="app"></div>';

const appEl = document.getElementById("app");

if (appEl) {
  const root = createRoot(appEl);
  root.render(<App />);
}
