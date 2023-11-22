import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "./App";
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: ,
        children: [
            {
                path: "",
                element: <Homepage />,
            }
        ]
    }
]);