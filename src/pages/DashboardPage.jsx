// src/pages/DashboardPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../components/layout/Navbar";
import useAuth from "../hooks/useAuth";

const DashboardPage = () => {
	const { isAuthenticated, loading } = useAuth();
	const navigate = useNavigate();

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!loading && !isAuthenticated) {
			navigate("/auth", { replace: true });
		}
	}, [isAuthenticated, loading, navigate]);

	// Show loading indicator
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
			</div>
		);
	}

	// If not authenticated, the useEffect will handle redirection
	// If we're still here, we should be authenticated
	if (!isAuthenticated) {
		return null; // Return nothing while redirection happens
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar />
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<Dashboard />
			</main>
		</div>
	);
};

export default DashboardPage;
