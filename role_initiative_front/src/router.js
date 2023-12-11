import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "./App";
import { userLoader } from "./loaders/userLoader";
import NoUserProtectedRoute from "./components/ProtectedRoutes/NoUserProtectedRoute";
import UserProtectedRoute from "./components/ProtectedRoutes/UserProtectedRoute";
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const LoginAndRegister = lazy(() => import("./pages/LoginAndRegister/LoginAndRegister"));
const AdminLoginAndRegister = lazy(() => import("./pages/LoginAndRegister/AdminLoginAndRegister"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: userLoader,
        // errorElement: ,
        children: [
            {
                path: "",
                element: <Homepage />,
                children: [
                    {
                        path: "fantasy",
                        // element:
                        //     <UserProtectedRoute>
                        //         <Fantasy />
                        //     </UserProtectedRoute>
                        // ,
                    },
                    {
                        path: "sci-fi",
                        // element:
                        //     <UserProtectedRoute>
                        //         <SciFi />
                        //     </UserProtectedRoute>
                        // ,
                    },
                    {
                        path: "horror-and-other",
                        // element:
                        //     <UserProtectedRoute>
                        //         <HorrorAndOther />
                        //     </UserProtectedRoute>
                        // ,
                    },
                ]
            },
            {
                path: "admin",
                element:
                    <NoUserProtectedRoute>
                        <AdminLoginAndRegister />
                    </NoUserProtectedRoute>
                ,
                loader: async () => {
                    const response = await fetch("/api/users/checkAdmin");
                    return await response.json();
                },
            },
            {
                path: "login-register",
                element:
                    <NoUserProtectedRoute>
                        <LoginAndRegister />
                    </NoUserProtectedRoute>
                ,
            },
            {
                path: "profile",
                element:
                    <UserProtectedRoute>
                        <Profile />
                    </UserProtectedRoute>
                ,
            },
            {
                path: "privacy-policy",
                // element: < />,
            },
            {
                path: "terms-of-service",
                // element: < />,
            },
        ]
    }
]);