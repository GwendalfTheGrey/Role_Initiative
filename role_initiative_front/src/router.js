import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "./App";
import LoginAndRegister from "./pages/LoginAndRegister/LoginAndRegister";
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
            },
            {
                path: "login-register",
                element: <LoginAndRegister />,
            }
        ]
    }
]);