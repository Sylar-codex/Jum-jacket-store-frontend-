import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderedProvider } from "./context/OrderedContext";
import { WalletProvider } from "./context/WalletContext";
import { MessageProvider } from "./context/MessageContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorProvider } from "./context/ErrorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductProvider>
    <CartProvider>
      <OrderedProvider>
        <AuthProvider>
          <MessageProvider>
            <ErrorProvider>
              <WalletProvider>
                <HashRouter>
                  <App />
                  <ToastContainer position="top-center" />
                </HashRouter>
              </WalletProvider>
            </ErrorProvider>
          </MessageProvider>
        </AuthProvider>
      </OrderedProvider>
    </CartProvider>
  </ProductProvider>
);
