import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Electronics from "./components/Category/Electronics/Electronics";
import TokenContext from "./components/Context/tokenContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Cart from "./components/Cart/Cart";
import CartContext from "./components/Context/CartContext";
import { Bounce, ToastContainer } from "react-toastify";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "category",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
          children: [
            {
              path: ":categoryWord",
              element: (
                <ProtectedRoute>
                  <Electronics />
                </ProtectedRoute>
              ),
            },
          ],
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        {
          path: "details/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <TokenContext>
      <CartContext>

        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
        
        <RouterProvider router={routes}></RouterProvider>
      </CartContext>
    </TokenContext>
  );
}
