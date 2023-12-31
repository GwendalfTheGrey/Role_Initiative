import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "./App";
import { userLoader } from "./loaders/userLoader";
import NoUserProtectedRoute from "./components/ProtectedRoutes/NoUserProtectedRoute";
import UserProtectedRoute from "./components/ProtectedRoutes/UserProtectedRoute";
import AdminGMProtectedRoute from "./components/ProtectedRoutes/AdminGMProtectedRoute";
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const LoginAndRegister = lazy(() => import("./pages/LoginAndRegister/LoginAndRegister"));
const AdminLoginAndRegister = lazy(() => import("./pages/LoginAndRegister/AdminLoginAndRegister"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Rooms = lazy(() => import("./pages/Rooms/Rooms"));
const Fantasy = lazy(() => import("./pages/Rooms/components/Fantasy"));
const SciFi = lazy(() => import("./pages/Rooms/components/SciFi"));
const HorrorAndOther = lazy(() => import("./pages/Rooms/components/HorrorAndOther"));
const Details = lazy(() => import("./pages/Details/Details"));
const NewRoom = lazy(() => import("./pages/NewRoom/NewRoom"));
const TermsOfService = lazy(() => import("./pages/TOS/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const LeagalNotices = lazy(() => import("./pages/LegalNotices/LeagalNotices"));
const ForgottenPassword = lazy(() => import("./pages/Security/ForgottenPassword/ForgottenPassword"));
const ResetPassword = lazy(() => import("./pages/Security/ResetPassword/ResetPassword"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: userLoader,
        children: [
            {
                path: "",
                children: [
                    {
                        path: "",
                        element: <Homepage />,
                    },
                    {
                        path: "profile/:idUser/:username",
                        element:
                            <UserProtectedRoute>
                                <Profile />
                            </UserProtectedRoute>
                        ,
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
                        path: "fantasy",
                        children: [
                            {
                                path: "",
                                element:
                                    <UserProtectedRoute>
                                        <Rooms>
                                            <Fantasy />
                                        </Rooms>
                                    </UserProtectedRoute>
                                ,
                            },
                            {
                                path: "room/:idRoom/:title",
                                element:
                                    <UserProtectedRoute>
                                        <Details />
                                    </UserProtectedRoute>
                                ,
                            },
                            {
                                path: "new-room",
                                element:
                                    <AdminGMProtectedRoute>
                                        <NewRoom />
                                    </AdminGMProtectedRoute>
                                ,
                            },
                        ],
                    },
                    {
                        path: "sci-fi",
                        children: [
                            {
                                path: "",
                                element:
                                    <UserProtectedRoute>
                                        <Rooms>
                                            <SciFi />
                                        </Rooms>
                                    </UserProtectedRoute>
                                ,
                            },
                            {
                                path: "room/:idRoom/:title",
                                element:
                                    <UserProtectedRoute>
                                        <Details />
                                    </UserProtectedRoute>
                                ,
                            },
                            {
                                path: "new-room",
                                element:
                                    <AdminGMProtectedRoute>
                                        <NewRoom />
                                    </AdminGMProtectedRoute>
                                ,
                            },
                        ],
                    },
                    {
                        path: "horror-and-other",
                        children: [
                            {
                                path: "",
                                element:
                                    <UserProtectedRoute>
                                        <Rooms>
                                            <HorrorAndOther />
                                        </Rooms>
                                    </UserProtectedRoute>
                                ,
                            },
                            {
                                path: "room/:idRoom/:title",
                                element:
                                    <UserProtectedRoute>
                                        <Details />
                                    </UserProtectedRoute>
                                ,
                            },
                            {
                                path: "new-room",
                                element:
                                    <AdminGMProtectedRoute>
                                        <NewRoom />
                                    </AdminGMProtectedRoute>
                                ,
                            },
                        ],
                    },
                    {
                        path: "room/:idRoom/:title",
                        element:
                            <UserProtectedRoute>
                                <Details />
                            </UserProtectedRoute>
                        ,
                    },
                    {
                        path: "new-room",
                        element:
                            <AdminGMProtectedRoute>
                                <NewRoom />
                            </AdminGMProtectedRoute>
                        ,
                    },
                ],
            },
            {
                path: "forgotten-password",
                element:
                    <NoUserProtectedRoute>
                        <ForgottenPassword />
                    </NoUserProtectedRoute>
                ,
            },
            {
                path: "reset-password",
                element:
                    <NoUserProtectedRoute>
                        <ResetPassword />
                    </NoUserProtectedRoute>
                ,
            },
            {
                path: "terms-of-service",
                element: <TermsOfService />,
            },
            {
                path: "privacy-policy",
                element: <PrivacyPolicy />,
            },
            {
                path: "legal-notices",
                element: <LeagalNotices />,
            },
        ]
    }
]);