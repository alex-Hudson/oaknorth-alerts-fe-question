import * as React from "react";
import {
  ChakraProvider,
  Text,
  theme,
} from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./nav/NavBar";
import { RampTable } from "./borrowers/BorrowerList";

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
      { path: "borrowers", element: <Text>Borrowers</Text>}
    ]
  }
]);

export const App = () => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
    <RampTable ramps={[]}></RampTable>
  </ChakraProvider>
);
