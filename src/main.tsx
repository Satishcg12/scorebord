import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles.css";
import KUMITEScoreboardController from "./route/KUMITEScoreboardController";
import KUMITEScoreboard from "./route/KUMITEScoreboard";
import App from "./App";
import KATAScoreBoard from "./route/KATAScoreBoard";
import KATAScoreBoardController from "./route/KATAScoreBoardController";
import Vr from "./route/Vr";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/kumites-scoreboard-controller",
    element: <KUMITEScoreboardController />
  },
  {
    path: "/kumites-scoreboard",
    element: <KUMITEScoreboard/>
  },
  {
    path:"/kata-scoreboard",
    element: <KATAScoreBoard/>
  },
  {
    path:"/kata-scoreboard-controller",
    element: <KATAScoreBoardController/>  
  },{
    path: "/vr/:id",
    element: <Vr />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
  <React.StrictMode >

      <RouterProvider router={router} />
  </React.StrictMode>
);
