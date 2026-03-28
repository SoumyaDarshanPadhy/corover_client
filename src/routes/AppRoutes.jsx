import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sessions from "../pages/Sessions";
import RawQueries from "../pages/RawQueries";
import { getToken } from "../utils/auth";
import Chat from "../pages/Chat";
import Layout from "../components/layout/Layout";

const PrivateRoute = ({ children }) => {
    return getToken() ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/sessions"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Sessions />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/queries"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <RawQueries />
                            </Layout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}