import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { router } from "./router";

const queryClient = new QueryClient();

document.body.innerHTML = '<div id="app"></div>';

const appEl = document.getElementById("app");

if (appEl) {
  const root = ReactDOM.createRoot(appEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
