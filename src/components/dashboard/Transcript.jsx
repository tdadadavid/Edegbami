// src/components/dashboard/Transcript.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { studentService } from "../../api";
import useAuth from "../../hooks/useAuth";

// Helper to determine grade color
const getGradeColor = (grade) => {
	const gradeColors = {
		A: "text-green-600",
		B: "text-blue-600",
		C: "text-yellow-600",
		D: "text-orange-500",
		E: "text-red-500",
		F: "text-red-600",
	};

	return gradeColors[grade] || "text-gray-600";
};

const Transcript = () => {
	const { user } = useAuth();
	const [cgpa, setCGPA] = useState(null);
	const [totalUnits, setTotalUnits] = useState(0);
	const [registeredCourses, setRegisteredCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [downloading, setDownloading] = useState(false);

	useEffect(() => {
		const fetchTranscriptData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Fetch CGPA
				const cgpaResponse = await studentService.getCGPA();
				setCGPA(cgpaResponse.cgpa.toFixed(2));
				setTotalUnits(cgpaResponse.totalUnits || 0);

				// Fetch registered courses with grades
				try {
					const coursesResponse = await studentService.getRegisteredCourses();
					// Combine compulsory and elective courses
					const allCourses = [
						...(coursesResponse.compulsory || []),
						...(coursesResponse.electives || []),
					];
					setRegisteredCourses(allCourses);
				} catch (err) {
					console.error("Error fetching registered courses:", err);
					setRegisteredCourses([]);
				}
			} catch (err) {
				console.error("Error fetching transcript data:", err);
				setError("Failed to load transcript data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchTranscriptData();
	}, []);

	const handleDownloadTranscript = async () => {
		try {
			setDownloading(true);
			// The downloadTranscript function opens a new window/tab with the PDF
			await studentService.downloadTranscript();
		} catch (err) {
			console.error("Error downloading transcript:", err);
			setError("Failed to download transcript. Please try again.");
		} finally {
			setDownloading(false);
		}
	};

	// Group courses by semester
	const groupedCourses = registeredCourses.reduce((acc, course) => {
		const semester = course.semester || "1st"; // Default to 1st if not specified
		if (!acc[semester]) {
			acc[semester] = [];
		}
		acc[semester].push(course);
		return acc;
	}, {});

	if (loading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<div className="flex flex-col items-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
					<p className="mt-3 text-gray-600">Loading transcript data...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8"
			>
				<h1 className="text-3xl font-bold text-gray-800">
					Academic Transcript
				</h1>
				<p className="text-gray-600 mt-1">
					View your academic performance and download your official transcript.
				</p>
			</motion.div>

			{error && (
				<div
					className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
					role="alert"
				>
					<p className="font-bold">Error</p>
					<p>{error}</p>
				</div>
			)}

			{/* CGPA Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="bg-white rounded-lg shadow-md p-6 mb-8"
			>
				<div className="flex flex-col md:flex-row md:justify-between md:items-center">
					<div>
						<h2 className="text-2xl font-bold text-gray-800">Current CGPA</h2>
						<p className="text-gray-600">Your cumulative grade point average</p>
						<p className="text-gray-600 mt-1">Total Units: {totalUnits}</p>
					</div>
					<div className="mt-4 md:mt-0">
						<div
							className={`text-5xl font-bold ${
								cgpa >= 4.5
									? "text-green-600"
									: cgpa >= 3.5
									? "text-blue-600"
									: cgpa >= 2.5
									? "text-yellow-600"
									: cgpa >= 1.5
									? "text-orange-500"
									: "text-red-500"
							}`}
						>
							{cgpa}
						</div>
					</div>
				</div>

				<div className="mt-6">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleDownloadTranscript}
						disabled={downloading}
						className={`
              flex items-center px-6 py-3 rounded-md text-white font-medium
              ${
								downloading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-indigo-600 hover:bg-indigo-700"
							}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              transition-colors duration-200
            `}
					>
						{downloading ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
								Preparing Download...
							</>
						) : (
							<>
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									></path>
								</svg>
								Download Official Transcript
							</>
						)}
					</motion.button>
				</div>
			</motion.div>

			{/* Courses by Semester */}
			{Object.entries(groupedCourses).length > 0 ? (
				Object.entries(groupedCourses).map(
					([semester, semesterCourses], index) => (
						<motion.div
							key={semester}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
							className="bg-white rounded-lg shadow-md mb-6 overflow-hidden"
						>
							<div
								className={`p-4 ${
									semester === "1st" ? "bg-green-50" : "bg-blue-50"
								}`}
							>
								<h3
									className={`text-lg font-semibold ${
										semester === "1st" ? "text-green-700" : "text-blue-700"
									}`}
								>
									{semester} Semester
								</h3>
							</div>

							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Course Code
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Course Name
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Units
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Grade
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Type
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{semesterCourses.map((course) => (
											<tr key={course.course_id} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
													{course.code || "No Code"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{course.name}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{course.unit}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													{course.grade ? (
														<span
															className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(
																course.grade
															)}`}
														>
															{course.grade}
														</span>
													) : (
														<span className="text-gray-400 text-sm">
															No grade yet
														</span>
													)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{course.mode === "COMPULSORY" ? (
														<span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
															Compulsory
														</span>
													) : (
														<span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
															Elective
														</span>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</motion.div>
					)
				)
			) : (
				<div className="bg-white rounded-lg shadow-md p-8 text-center">
					<p className="text-gray-600">
						No course registrations found. Please register for courses first.
					</p>
				</div>
			)}

			{/* Grade Key */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="bg-white rounded-lg shadow-md p-6"
			>
				<h3 className="text-lg font-semibold text-gray-800 mb-4">
					Grading System
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					<div className="flex items-center">
						<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 mr-2 font-bold">
							A
						</span>
						<span className="text-sm">5 points</span>
					</div>
					<div className="flex items-center">
						<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-2 font-bold">
							B
						</span>
						<span className="text-sm">4 points</span>
					</div>
					<div className="flex items-center">
						<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 mr-2 font-bold">
							C
						</span>
						<span className="text-sm">3 points</span>
					</div>
					<div className="flex items-center">
						<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-500 mr-2 font-bold">
							D
						</span>
						<span className="text-sm">2 points</span>
					</div>
					<div className="flex items-center">
						<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-500 mr-2 font-bold">
							E
						</span>
						<span className="text-sm">1 point</span>
					</div>
					<div className="flex items-center">
						<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 mr-2 font-bold">
							F
						</span>
						<span className="text-sm">0 points</span>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Transcript;
