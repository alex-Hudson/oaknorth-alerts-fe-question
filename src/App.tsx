import * as React from "react";
import { ChakraProvider, Text, theme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./nav/NavBar";
import { BorrowerTable } from "./borrowers/BorrowerList";
import { AlertsTable } from "./alerts/AlertsLists";

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
        element: <BorrowerTable ramps={[]}></BorrowerTable>,
      },
      { path: "alerts", element: <AlertsTable ramps={[]}></AlertsTable> },
    ],
  },
]);

export const App = () => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
