import * as React from "react";
import { ChakraProvider, Text, theme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./nav/NavBar";
import { AlertsPage } from "./alerts/AlertsPage";
import { BorrowerPage } from "./borrowers/BorrowersPage";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <>
        <NavBar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "borrowers",
        element: <BorrowerPage></BorrowerPage>,
      },
      { path: "alerts", element: <AlertsPage></AlertsPage> },
    ],
  },
]);

export const App = () => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
