import React from "react";
import { createRoot } from "react-dom/client";
import { hello } from "./hello";

document.body.innerHTML = '<div id="app"></div>';

const appEl = document.getElementById("app");
if (appEl) {
  const root = createRoot(appEl);
  root.render(<h1>Hello, world2</h1>);
  console.log(hello());
}
