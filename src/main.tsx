import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles.css";
import ScorebordController from "./route/ScoreboardController";
import Scoreboard from "./route/Scoreboard";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/scoreboard-controller",
    element: <ScorebordController />
  },
  {
    path: "/scoreboard",
    element: <Scoreboard />
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
  <React.StrictMode >

      <RouterProvider router={router} />
  </React.StrictMode>
);
