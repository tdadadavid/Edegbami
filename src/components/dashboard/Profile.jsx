// src/components/dashboard/Profile.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const ProfileField = ({
	label,
	value,
	icon,
	isEditing,
	onChange,
	name,
	type = "text",
}) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-600 mb-1">
				{label}
			</label>
			<div className="mt-1 relative rounded-md shadow-sm">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
					{icon}
				</div>
				{isEditing ? (
					<input
						type={type}
						name={name}
						value={value || ""}
						onChange={onChange}
						className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder={label}
					/>
				) : (
					<div className="block w-full pl-10 pr-3 py-2 border border-gray-200 bg-gray-50 rounded-md sm:text-sm">
						{value || "Not provided"}
					</div>
				)}
			</div>
		</div>
	);
};

const Profile = () => {
	const { user } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		firstname: user?.firstname || "",
		lastname: user?.lastname || "",
		email: user?.email || "",
		phonenumber: user?.phonenumber || "",
		age: user?.age || "",
	});
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// In a real application, you would call an API to update the profile
		// For this demo, we'll just simulate success
		setTimeout(() => {
			setSuccess(true);
			setIsEditing(false);
			// Hide success message after 3 seconds
			setTimeout(() => setSuccess(false), 3000);
		}, 1000);
	};

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8"
			>
				<h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
				<p className="text-gray-600 mt-1">
					View and manage your personal information
				</p>
			</motion.div>

			{success && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
					role="alert"
				>
					<p className="font-bold">Success!</p>
					<p>Your profile has been updated successfully.</p>
				</motion.div>
			)}

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="bg-white rounded-lg shadow-md overflow-hidden"
			>
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold text-gray-800">
							Personal Information
						</h2>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
							className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
								isEditing
									? "bg-green-600 hover:bg-green-700"
									: "bg-indigo-600 hover:bg-indigo-700"
							} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
						>
							{isEditing ? "Save Changes" : "Edit Profile"}
						</motion.button>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<ProfileField
									label="First Name"
									value={profileData.firstname}
									name="firstname"
									isEditing={isEditing}
									onChange={handleChange}
									icon={
										<svg
											className="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									}
								/>
							</div>
							<div>
								<ProfileField
									label="Last Name"
									value={profileData.lastname}
									name="lastname"
									isEditing={isEditing}
									onChange={handleChange}
									icon={
										<svg
											className="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									}
								/>
							</div>
						</div>

						<ProfileField
							label="Email Address"
							value={profileData.email}
							name="email"
							type="email"
							isEditing={false} // Email cannot be edited
							onChange={handleChange}
							icon={
								<svg
									className="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							}
						/>

						<ProfileField
							label="Phone Number"
							value={profileData.phonenumber}
							name="phonenumber"
							isEditing={isEditing}
							onChange={handleChange}
							icon={
								<svg
									className="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
							}
						/>

						<ProfileField
							label="Age"
							value={profileData.age}
							name="age"
							type="number"
							isEditing={isEditing}
							onChange={handleChange}
							icon={
								<svg
									className="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							}
						/>

						{/* Academic Information Section */}
						<div className="mt-8 mb-6">
							<h2 className="text-xl font-semibold text-gray-800">
								Academic Information
							</h2>
							<p className="text-gray-500 text-sm mt-1">
								This information is maintained by the university and cannot be
								edited.
							</p>
						</div>

						<div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<ProfileField
										label="Student ID"
										value={user?.id}
										isEditing={false}
										icon={
											<svg
												className="h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
												/>
											</svg>
										}
									/>
								</div>
								<div>
									<ProfileField
										label="Level"
										value={user?.level}
										isEditing={false}
										icon={
											<svg
												className="h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path d="M12 14l9-5-9-5-9 5 9 5z" />
												<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
												/>
											</svg>
										}
									/>
								</div>
							</div>

							<ProfileField
								label="Department"
								value={`Department ID: ${user?.department_id}`}
								isEditing={false}
								icon={
									<svg
										className="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
										/>
									</svg>
								}
							/>
						</div>

						{isEditing && (
							<div className="mt-6 flex justify-end">
								<button
									type="button"
									onClick={() => setIsEditing(false)}
									className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								>
									Save Changes
								</button>
							</div>
						)}
					</form>
				</div>
			</motion.div>

			{/* Password Change Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="bg-white rounded-lg shadow-md overflow-hidden mt-6"
			>
				<div className="p-6">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Change Password
					</h2>
					<p className="text-gray-600 mb-4">
						To change your password, enter your current password and then your
						new password.
					</p>

					<div className="space-y-4">
						<div className="relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
								<svg
									className="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<input
								type="password"
								placeholder="Current Password"
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>

						<div className="relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
								<svg
									className="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<input
								type="password"
								placeholder="New Password"
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>

						<div className="relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
								<svg
									className="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<input
								type="password"
								placeholder="Confirm New Password"
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
					</div>

					<div className="mt-6">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Change Password
						</motion.button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Profile;
