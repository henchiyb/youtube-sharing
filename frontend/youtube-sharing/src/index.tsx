import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./pages/HomePage/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageLayout from "./layouts/PageLayout/PageLayout";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./hooks/useAuth";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
