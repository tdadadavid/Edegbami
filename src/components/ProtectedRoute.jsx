// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();

	// Show loading spinner while checking authentication
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
			</div>
		);
	}

	// Redirect to login if not authenticated
	if (!isAuthenticated) {
		return <Navigate to="/auth" replace />;
	}

	// Render children if authenticated
	return children;
};

export default ProtectedRoute;
