import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainTemplate from "./components/templates/MainTemplate";
import ErrorPage from "./components/pages/ErrorPage";
import IndexPage from "./components/pages/IndexPage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import CatalogPage from "./components/pages/CatalogPage";
import ProductPage from "./components/pages/ProductPage";
import CartPage from "./components/pages/CartPage";

function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <MainTemplate />,
    children: [
      {
        path: '*',
        element: <ErrorPage />,
      },
      {
        path: '/',
        exact: true,
        element: <IndexPage />,
      },
      {
        path: '/about.html',
        element: <AboutPage />
      },
      {
        path: '/contacts.html',
        element: <ContactPage />,
      },
      {
        path: '/catalog.html',
        element: <CatalogPage />,
      },
      {
        path: '/catalog/:id.html',
        element: <ProductPage />,
      },
      {
        path: '/cart.html',
        element: <CartPage />,
      },
    ]
  }]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
