import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);

    // Load user from token on refresh
    useEffect(() => {
        if (token) {
            fetchUserFromToken();
        }
    }, [token]);

    const fetchUserFromToken = async () => {
        try {
            const res = await axios.get("/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(res.data.user);
        } catch (error) {
            console.error("Invalid token");
            logout();
        }
    };

    // REGISTER
    const handleRegister = async (userData) => {
        try {
            setLoading(true);

            const res = await axios.post("/api/auth/register", userData);

            setLoading(false);
            return res.data.message; // Sent back to the Snackbar
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // LOGIN
    const handleLogin = async (email, password) => {
        try {
            setLoading(true);

            const res = await axios.post("/api/auth/login", { email, password });

            const { token, user } = res.data;

            // Save token locally
            localStorage.setItem("token", token);

            setToken(token);
            setUser(user);

            setLoading(false);

            return user;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // LOGOUT
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                handleRegister,
                handleLogin,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};