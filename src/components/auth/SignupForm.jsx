// src/components/auth/SignupForm.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const SignupForm = ({ onSuccess }) => {
	const [departments, setDepartments] = useState([]);
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		confirmPassword: "",
		department: "",
		phonenumber: "",
		age: "",
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [serverError, setServerError] = useState("");

	const { signup, loading } = useAuth();

	// Fetch departments (in a real app, this would come from an API)
	useEffect(() => {
		// Mock data for departments
		setDepartments([
			{ id: 1, name: "Computer Engineering" },
			{ id: 2, name: "Physics" },
			{ id: 3, name: "English" },
			{ id: 4, name: "Accounting" },
			{ id: 5, name: "Medicine" },
			{ id: 6, name: "Law" },
			{ id: 7, name: "Education" },
			{ id: 8, name: "Economics" },
			{ id: 9, name: "Agriculture" },
			{ id: 10, name: "Architecture" },
		]);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		// Clear error when field is changed
		if (errors[name]) {
			setErrors({ ...errors, [name]: "" });
		}
	};

	const validateForm = () => {
		const newErrors = {};

		// Validate first name
		if (!formData.first_name.trim()) {
			newErrors.first_name = "First name is required";
		}

		// Validate last name
		if (!formData.last_name.trim()) {
			newErrors.last_name = "Last name is required";
		}

		// Validate email
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		// Validate password
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		// Validate password confirmation
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		// Validate department
		if (!formData.department) {
			newErrors.department = "Department is required";
		}

		// Validate phone number
		if (!formData.phonenumber.trim()) {
			newErrors.phonenumber = "Phone number is required";
		}

		// Validate age
		if (!formData.age) {
			newErrors.age = "Age is required";
		} else if (
			isNaN(formData.age) ||
			parseInt(formData.age) < 15 ||
			parseInt(formData.age) > 100
		) {
			newErrors.age = "Please enter a valid age between 15 and 100";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setServerError("");

		if (validateForm()) {
			setIsSubmitting(true);

			try {
				// Remove confirmPassword as it's not needed in the API
				const { confirmPassword, ...signupData } = formData;

				await signup(signupData);
				if (onSuccess) onSuccess();
			} catch (error) {
				setServerError(error.error || "Registration failed. Please try again.");
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	return (
		<motion.div
			className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-2xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="text-center">
				<h2 className="text-3xl font-extrabold text-gray-900">
					Create Your Student Account
				</h2>
				<p className="mt-2 text-sm text-gray-600">
					Fill out the form below to register as a student
				</p>
			</div>

			{serverError && (
				<motion.div
					className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3 }}
				>
					{serverError}
				</motion.div>
			)}

			<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* First Name */}
					<div>
						<label
							htmlFor="first_name"
							className="block text-sm font-medium text-gray-700"
						>
							First Name
						</label>
						<input
							id="first_name"
							name="first_name"
							type="text"
							value={formData.first_name}
							onChange={handleChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						{errors.first_name && (
							<p className="mt-1 text-xs text-red-600">{errors.first_name}</p>
						)}
					</div>

					{/* Last Name */}
					<div>
						<label
							htmlFor="last_name"
							className="block text-sm font-medium text-gray-700"
						>
							Last Name
						</label>
						<input
							id="last_name"
							name="last_name"
							type="text"
							value={formData.last_name}
							onChange={handleChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						{errors.last_name && (
							<p className="mt-1 text-xs text-red-600">{errors.last_name}</p>
						)}
					</div>

					{/* Email */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email Address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						{errors.email && (
							<p className="mt-1 text-xs text-red-600">{errors.email}</p>
						)}
					</div>

					{/* Phone Number */}
					<div>
						<label
							htmlFor="phonenumber"
							className="block text-sm font-medium text-gray-700"
						>
							Phone Number
						</label>
						<input
							id="phonenumber"
							name="phonenumber"
							type="text"
							value={formData.phonenumber}
							onChange={handleChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						{errors.phonenumber && (
							<p className="mt-1 text-xs text-red-600">{errors.phonenumber}</p>
						)}
					</div>

					{/* Department */}
					<div>
						<label
							htmlFor="department"
							className="block text-sm font-medium text-gray-700"
						>
							Department
						</label>
						<select
							id="department"
							name="department"
							value={formData.department}
							onChange={handleChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
							<option value="">Select Department</option>
							{departments.map((dept) => (
								<option key={dept.id} value={dept.id}>
									{dept.name}
								</option>
							))}
						</select>
						{errors.department && (
							<p className="mt-1 text-xs text-red-600">{errors.department}</p>
						)}
					</div>

					{/* Age */}
					<div>
						<label
							htmlFor="age"
							className="block text-sm font-medium text-gray-700"
						>
							Age
						</label>
						<input
							id="age"
							name="age"
							type="number"
							min="15"
							max="100"
							value={formData.age}
							onChange={handleChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						{errors.age && (
							<p className="mt-1 text-xs text-red-600">{errors.age}</p>
						)}
					</div>

					{/* Password */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						{errors.password && (
							<p className="mt-1 text-xs text-red-600">{errors.password}</p>
						)}
					</div>

					{/* Confirm Password */}
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700"
						>
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						{errors.confirmPassword && (
							<p className="mt-1 text-xs text-red-600">
								{errors.confirmPassword}
							</p>
						)}
					</div>
				</div>

				<div>
					<motion.button
						type="submit"
						className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						disabled={isSubmitting || loading}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						{isSubmitting || loading ? (
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
							"Create Account"
						)}
					</motion.button>
				</div>
			</form>
		</motion.div>
	);
};

export default SignupForm;
