// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");
	const { login, loading } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoginError("");

		if (!email || !password) {
			setLoginError("Email and password are required");
			return;
		}

		try {
			console.log("Attempting login with:", email);
			const success = await login(email, password);

			if (success) {
				console.log("Login successful, redirecting to dashboard");
				navigate("/dashboard", { replace: true });
			}
		} catch (error) {
			console.error("Login form error:", error);
			setLoginError(
				error.message || "Login failed. Please check your credentials."
			);
		}
	};

	return (
		<motion.div
			className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="text-center">
				<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
					Student Login
				</h2>
				<p className="mt-2 text-sm text-gray-600">
					Sign in to access your student portal
				</p>
			</div>

			{loginError && (
				<motion.div
					className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3 }}
				>
					{loginError}
				</motion.div>
			)}

			<form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
				<div className="rounded-md shadow-sm space-y-4">
					<div>
						<label htmlFor="email" className="sr-only">
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Email address"
						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Password"
						/>
					</div>
				</div>

				<div>
					<motion.button
						type="submit"
						className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						disabled={loading}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						{loading ? (
							<svg
								className="animate-spin h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						) : (
							"Sign in"
						)}
					</motion.button>
				</div>
			</form>
		</motion.div>
	);
};

export default LoginForm;
