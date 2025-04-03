// src/pages/ProfilePage.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import Profile from "../components/dashboard/Profile";
import Navbar from "../components/layout/Navbar";
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {
	const { isAuthenticated, loading } = useAuth();

	// Show loading indicator
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

	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar />
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<Profile />
			</main>
		</div>
	);
};

export default ProfilePage;
