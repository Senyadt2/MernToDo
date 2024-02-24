import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./page/Homepage";
import AboutMe from "./page/AboutMe";

const MyRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/Aboutme",
      element: <AboutMe />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default MyRouter;
