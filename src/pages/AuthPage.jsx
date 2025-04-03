// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import useAuth from "../hooks/useAuth";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  // Display loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
      </div>
    );
  }

  // Only redirect when fully loaded and confirmed authenticated
  if (!loading && isAuthenticated) {
    console.log("Auth page: Already authenticated, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  const toggleMode = () => {
		setMode(mode === "login" ? "signup" : "login");
		setSignupSuccess(false);
	};

	const handleSignupSuccess = () => {
		setSignupSuccess(true);
		setMode("login");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-4xl">
				<div className="flex flex-col items-center">
					<motion.h1
						className="text-4xl font-bold text-white mb-2"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Student Portal
					</motion.h1>
					<motion.div
						className="h-1 w-20 bg-yellow-400 rounded mb-8"
						initial={{ width: 0 }}
						animate={{ width: 80 }}
						transition={{ duration: 0.8 }}
					/>
				</div>

				<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
					<div className="flex flex-col md:flex-row">
						{/* Left side - intro/welcome */}
						<div className="w-full md:w-1/2 bg-indigo-700 p-8 flex flex-col justify-center text-white">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<h2 className="text-3xl font-bold mb-6">
									{mode === "login" ? "Welcome Back!" : "Join Our Community"}
								</h2>
								<p className="mb-8 text-indigo-200">
									{mode === "login"
										? "Access your courses, grades, and academic records with our secure student portal."
										: "Register as a student to access course registration, grades, and all student services."}
								</p>
								<motion.button
									onClick={toggleMode}
									className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-indigo-700 transition-colors duration-300"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{mode === "login" ? "Create an Account" : "Sign In Instead"}
								</motion.button>
							</motion.div>
						</div>

						{/* Right side - form */}
						<div className="w-full md:w-1/2 p-8">
							<AnimatePresence mode="wait">
								{signupSuccess ? (
									<motion.div
										key="success"
										className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3 }}
									>
										<div className="flex items-center">
											<svg
												className="w-5 h-5 mr-2"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clipRule="evenodd"
												/>
											</svg>
											<div>
												<span className="font-medium">
													Registration successful!
												</span>
												<p>You can now sign in with your credentials.</p>
											</div>
										</div>
									</motion.div>
								) : null}

								<motion.div
									key={mode}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3 }}
								>
									{mode === "login" ? (
										<LoginForm />
									) : (
										<SignupForm onSuccess={handleSignupSuccess} />
									)}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
