// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { authService, studentService } from "../api";

// Create the auth context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Check authentication status on mount
	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

				if (isLoggedIn) {
					try {
						setLoading(true);
						// Mock user data for testing/development
						// In a real app, you would use the API call below
						/*
            const profile = await studentService.getProfile();
            setUser(profile);
            */

						// Mock profile data
						const mockProfile = {
							id: "1",
							firstname: "Student",
							lastname: "User",
							email: "student@example.com",
							department_id: "CSC",
							level: "300",
							phonenumber: "1234567890",
						};
						setUser(mockProfile);
					} catch (err) {
						console.error("Profile fetch failed:", err);
						localStorage.removeItem("isLoggedIn");
						setUser(null);
					}
				} else {
					setUser(null);
				}
			} catch (err) {
				console.error("Auth check error:", err);
			} finally {
				setLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	// Login function
	const login = async (email, password) => {
		try {
			setLoading(true);
			setError(null);

			// Attempt to login
			await authService.login({ email, password });

			// Set login state
			localStorage.setItem("isLoggedIn", "true");

			// Get user profile - for now, using mock data
			try {
				// In a real app, uncomment this:
				// const profile = await studentService.getProfile();

				// Mock profile for now
				const mockProfile = {
					id: "1",
					firstname: "Student",
					lastname: "User",
					email: email, // Use the email from login
					department_id: "CSC",
					level: "300",
					phonenumber: "1234567890",
				};

				setUser(mockProfile);
				return true;
			} catch (profileErr) {
				console.error("Profile fetch error after login:", profileErr);

				// Even if profile fetch fails, we'll keep the user logged in
				// but with limited data
				setUser({ email: email });
				return true;
			}
		} catch (err) {
			console.error("Login error:", err);
			localStorage.removeItem("isLoggedIn");
			setUser(null);

			let errorMessage = "Login failed. Please check your credentials.";
			if (err.response?.data?.message) {
				errorMessage = err.response.data.message;
			} else if (err.message) {
				errorMessage = err.message;
			}

			setError(errorMessage);
			throw new Error(errorMessage);
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
			console.error("Signup error:", err);

			let errorMessage = "Registration failed. Please try again.";
			if (err.response?.data?.message) {
				errorMessage = err.response.data.message;
			} else if (err.message) {
				errorMessage = err.message;
			}

			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	// Logout function
	const logout = async () => {
		try {
			await authService.logout();
		} catch (err) {
			console.error("Logout error:", err);
		} finally {
			localStorage.removeItem("isLoggedIn");
			setUser(null);
		}
	};

	// Value object to be provided
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
