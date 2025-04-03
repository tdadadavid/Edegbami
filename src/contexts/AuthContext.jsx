// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { authService, studentService } from "../api";

// Create the auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// In src/contexts/AuthContext.jsx
	// In src/contexts/AuthContext.jsx
	// In AuthContext.jsx
	const login = async (email, password) => {
		try {
			setLoading(true);
			setError(null);
			const response = await authService.login({ email, password });

			// Set local flag to prevent redirect loop
			localStorage.setItem("isLoggedIn", "true");

			const profile = await studentService.getProfile();
			setUser(profile);
			return response;
		} catch (err) {
			localStorage.removeItem("isLoggedIn");
			setError(err.error || "Failed to login");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Signup function
	const signup = async (userData) => {
		try {
			setLoading(true);
			setError(null);
			const response = await authService.signup(userData);
			return response;
		} catch (err) {
			setError(err.error || "Failed to register");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// In useEffect for checking auth
	useEffect(() => {
		const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

		const checkAuthStatus = async () => {
			// Only check status if we think we're logged in
			if (isLoggedIn) {
				try {
					setLoading(true);
					const profile = await studentService.getProfile();
					setUser(profile);
				} catch (err) {
					// Clear local storage on auth failure
					localStorage.removeItem("isLoggedIn");
					setUser(null);
				} finally {
					setLoading(false);
				}
			} else {
				setUser(null);
				setLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	// In logout
	const logout = async () => {
		try {
			await authService.logout();
			localStorage.removeItem("isLoggedIn");
			setUser(null);
		} catch (err) {
			console.error("Logout error:", err);
		}
	};

	const value = {
		user,
		loading,
		error,
		login,
		signup,
		logout,
		isAuthenticated: !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
