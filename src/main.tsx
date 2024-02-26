import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import "./styles.css";
import KUMITEScoreboardController from "./route/KUMITEScoreboardController";
import KUMITEScoreboard from "./route/KUMITEScoreboard";
import App from "./App";
import KATAScoreBoard from "./route/KATAScoreBoard";
import KATAScoreBoardController from "./route/KATAScoreBoardController";
import Vr from "./route/Vr";
import ProtectedRoute from "./route/ProtectedRoute";
import VerifyForm from "./route/VerifyForm";
import TrialForm from "./route/TrialForm";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/verify",
//     element: <Verify />,
//   },
//   {
//     path: "/kumites-scoreboard-controller",
//     element: <KUMITEScoreboardController />,
//   },
//   {
//     path: "/kumites-scoreboard",
//     element: <KUMITEScoreboard />,
//   },
//   {
//     path: "/kata-scoreboard",
//     element: <KATAScoreBoard />,
//   },
//   {
//     path: "/kata-scoreboard-controller",
//     element: <KATAScoreBoardController />,
//   },
//   {
//     path: "/vr/:id",
//     element: <Vr />,
//   },
//   {
//     path: "*",
//     element: <div>Not Found</div>,
//   },
// ]);




ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <ProtectedRoute>
      <RouterProvider router={router} />
    </ProtectedRoute> */}
    
    <BrowserRouter>
      <Routes>
        <Route path="/verify" element={<VerifyForm />} />
        <Route path="/trial" element={<TrialForm />} />
        {/* <ProtectedRoute> */}
        <Route path="/" element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } />
        <Route
          path="/kumites-scoreboard-controller"
          element={
            <ProtectedRoute>
              <KUMITEScoreboardController />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kumites-scoreboard"
          element={
            <ProtectedRoute>
              <KUMITEScoreboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kata-scoreboard"
          element={
            <ProtectedRoute>
              <KATAScoreBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kata-scoreboard-controller"
          element={
            <ProtectedRoute>
              <KATAScoreBoardController />
            </ProtectedRoute>
          }
        />
        <Route path="/vr/:id" element={<Vr />} />
        <Route path="*" element={<div>Not Found</div>} />
        {/* </ProtectedRoute> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
