import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsProvider from "./contexts/ProductsProvider";
import ToggleProvider from "./contexts/ToggleProvider";
import CartsProvider from "./contexts/CartsProvider";
import "react-toastify/dist/ReactToastify.css";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ToggleProvider>
        <ProductsProvider>
          <CartsProvider>
            <Router>
              <App />
            </Router>
          </CartsProvider>
        </ProductsProvider>
      </ToggleProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
