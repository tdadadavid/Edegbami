// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
	const { user, logout } = useAuth();
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/auth"); // Explicitly navigate to auth page
	};

	return (
		<nav className="bg-indigo-800 shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link to="/dashboard">
								<motion.div
									whileHover={{ scale: 1.05 }}
									className="text-white font-bold text-xl"
								>
									Student Portal
								</motion.div>
							</Link>
						</div>

						{/* Desktop navigation links */}
						<div className="hidden sm:ml-6 sm:flex sm:items-center">
							<Link
								to="/dashboard"
								className="px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 rounded-md"
							>
								Dashboard
							</Link>
							<Link
								to="/courses"
								className="px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 rounded-md"
							>
								Courses
							</Link>
							<Link
								to="/transcript"
								className="px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 rounded-md"
							>
								Transcript
							</Link>
							<Link
								to="/profile"
								className="px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 rounded-md"
							>
								Profile
							</Link>
						</div>
					</div>

					<div className="flex items-center">
						{/* User profile dropdown */}
						<div className="ml-3 relative">
							<div>
								<button
									onClick={() => setIsProfileOpen(!isProfileOpen)}
									className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
								>
									<span className="sr-only">Open user menu</span>
									<div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
										{user?.firstname?.charAt(0) || "U"}
									</div>
								</button>
							</div>

							<AnimatePresence>
								{isProfileOpen && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										transition={{ duration: 0.2 }}
										className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
									>
										<div className="px-4 py-2 text-sm text-gray-700 border-b">
											<p className="font-semibold">
												{user?.firstname} {user?.lastname}
											</p>
											<p className="text-xs text-gray-500">{user?.email}</p>
										</div>
										<Link
											to="/profile"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => setIsProfileOpen(false)}
										>
											Your Profile
										</Link>
										<button
											onClick={handleLogout}
											className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Sign out
										</button>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Mobile menu button */}
						<div className="flex sm:hidden ml-4">
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							>
								<span className="sr-only">Open main menu</span>
								{isMobileMenuOpen ? (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								) : (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="sm:hidden"
					>
						<div className="px-2 pt-2 pb-3 space-y-1">
							<Link
								to="/dashboard"
								className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Dashboard
							</Link>
							<Link
								to="/courses"
								className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Courses
							</Link>
							<Link
								to="/transcript"
								className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Transcript
							</Link>
							<Link
								to="/profile"
								className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Profile
							</Link>
							<button
								onClick={handleLogout}
								className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
							>
								Sign out
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
