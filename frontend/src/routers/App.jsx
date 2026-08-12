//External modules

import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//files 

import Auth from "./Auth";
import Login from "../components/public/Login";
import Otp from "../components/public/Otp";
import Chat from "../components/private/Chat";
import NotFound from "../components/common/NotFound";
import Loader from "../components/common/Loader";
import MainLoader from "../components/common/MainLoader"
import Confirmation from "../components/common/Confirmation";
import CreateRoom from "../components/private/CreateRoom";
import "../App.css";


const Router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "Otp",
        element: <Otp />,
      },
    ],
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {path:"/loader",
    element:<Confirmation />
  },
  {path:"/create",
    element:<CreateRoom />
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
