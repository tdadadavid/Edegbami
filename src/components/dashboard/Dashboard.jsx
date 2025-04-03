// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { studentService } from "../../api";
import useAuth from "../../hooks/useAuth";

// Stats card component
const StatCard = ({ title, value, icon, color }) => (
	<motion.div
		className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}
		whileHover={{
			scale: 1.03,
			boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
		}}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className="flex justify-between items-center">
			<div>
				<h3 className="text-lg text-gray-500 font-medium">{title}</h3>
				<p className="text-2xl font-bold mt-1">{value}</p>
			</div>
			<div
				className={`p-3 rounded-full ${color
					.replace("border-", "bg-")
					.replace("-600", "-100")} ${color.replace("border-", "text-")}`}
			>
				{icon}
			</div>
		</div>
	</motion.div>
);

// Action card component
const ActionCard = ({
	title,
	description,
	linkTo,
	buttonText,
	icon,
	delay,
}) => (
	<motion.div
		className="bg-white rounded-lg shadow-md overflow-hidden"
		whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5, delay }}
	>
		<div className="p-6">
			<div className="flex items-center mb-4">
				<div className="p-2 rounded-md bg-indigo-100 text-indigo-600 mr-4">
					{icon}
				</div>
				<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
			</div>
			<p className="text-gray-600 mb-4">{description}</p>
			<Link
				to={linkTo}
				className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				{buttonText}
			</Link>
		</div>
	</motion.div>
);

const Dashboard = () => {
	const { user } = useAuth();
	const [cgpa, setCGPA] = useState(null);
	const [registeredCourses, setRegisteredCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setLoading(true);
				// Fetch CGPA
				const cgpaResponse = await studentService.getCGPA();
        setCGPA(cgpaResponse.cgpa.toFixed(2));

				// Here we'd normally fetch registered courses, but API doesn't have that endpoint
				// Using mock data for display purposes
				setRegisteredCourses([
					{ id: 1, code: "CSC101", name: "Introduction to Computer Science" },
					{ id: 2, code: "MTH101", name: "Calculus I" },
					{ id: 3, code: "ENG101", name: "English Composition" },
					{ id: 4, code: "PHY101", name: "General Physics I" },
				]);
			} catch (err) {
				console.error("Error fetching dashboard data:", err);
				setError("Failed to load dashboard data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div
				className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4"
				role="alert"
			>
				<p className="font-bold">Error</p>
				<p>{error}</p>
			</div>
		);
	}

	return (
		<div className="p-6">
			{/* Welcome section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8"
			>
				<h1 className="text-3xl font-bold text-gray-800">
					Welcome back, {user?.firstname || "Student"}!
				</h1>
				<p className="text-gray-600 mt-1">
					Here's an overview of your academic progress and quick access to
					important features.
				</p>
			</motion.div>

			{/* Stats row */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<StatCard
					title="Current CGPA"
					value={cgpa || "N/A"}
					icon={
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/>
						</svg>
					}
					color="border-green-600"
				/>
				<StatCard
					title="Current Level"
					value={user?.level || "N/A"}
					icon={
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
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
					color="border-blue-600"
				/>
				<StatCard
					title="Department"
					value={`Dept ${user?.department_id || "N/A"}`}
					icon={
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
							/>
						</svg>
					}
					color="border-purple-600"
				/>
				<StatCard
					title="Registered Courses"
					value={registeredCourses.length}
					icon={
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
							/>
						</svg>
					}
					color="border-yellow-600"
				/>
			</div>

			{/* Quick actions */}
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				<ActionCard
					title="Course Registration"
					description="Register for this semester's courses including compulsory and elective options."
					linkTo="/courses"
					buttonText="Register Courses"
					delay={0.1}
					icon={
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
					}
				/>
				<ActionCard
					title="View Transcript"
					description="Access your complete academic record and download official transcript."
					linkTo="/transcript"
					buttonText="View Transcript"
					delay={0.2}
					icon={
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					}
				/>
				<ActionCard
					title="Update Profile"
					description="View and update your personal information and contact details."
					linkTo="/profile"
					buttonText="Edit Profile"
					delay={0.3}
					icon={
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
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

			{/* Registered courses */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				<h2 className="text-2xl font-bold text-gray-800 mb-4">
					Registered Courses
				</h2>
				<div className="bg-white shadow overflow-hidden rounded-lg">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Course Code
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Course Name
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{registeredCourses.map((course) => (
								<tr key={course.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
										{course.code}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{course.name}
									</td>
								</tr>
							))}
							{registeredCourses.length === 0 && (
								<tr>
									<td
										colSpan="2"
										className="px-6 py-4 text-center text-sm text-gray-500"
									>
										No courses registered yet.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</motion.div>
		</div>
	);
};

export default Dashboard;
