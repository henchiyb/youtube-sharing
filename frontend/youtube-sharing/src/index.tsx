import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./pages/HomePage/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageLayout from "./layouts/PageLayout/PageLayout";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./hooks/useAuth";
import ShareMovie from "./pages/ShareMovie/ShareMovie";
import ProtectedRoute from "./components/ProtectedRoute";
import { SnackbarProvider } from "notistack";
import ShareIcon from "@mui/icons-material/Reply";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/share",
        element: (
          <ProtectedRoute>
            <ShareMovie />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={5000}
      iconVariant={{
        success: "✅",
        error: "✖️",
        warning: "⚠️",
        info: <ShareIcon sx={{ marginBottom: 0.5, marginRight: 1 }} />,
      }}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
