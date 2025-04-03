// src/components/dashboard/CourseRegistration.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { studentService } from "../../api";

const CourseCard = ({ course, isSelected, onToggle, isCompulsory }) => {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className={`border rounded-lg overflow-hidden shadow-sm transition-all duration-200 ${
				isSelected
					? "border-indigo-500 bg-indigo-50"
					: "border-gray-200 bg-white"
			}`}
		>
			<div className="p-4">
				<div className="flex justify-between items-start">
					<div>
						<h3 className="text-lg font-semibold">{course.course_name}</h3>
						<span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 mt-1">
							{course.code || "No Code"}
						</span>
					</div>
					<div className="flex flex-col items-end">
						<span className="text-sm text-gray-500">{course.unit} Units</span>
						{isCompulsory ? (
							<span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 mt-1">
								Compulsory
							</span>
						) : (
							<label className="relative inline-flex items-center cursor-pointer mt-2">
								<input
									type="checkbox"
									className="sr-only peer"
									checked={isSelected}
									onChange={() => onToggle(course.course_id)}
									disabled={isCompulsory}
								/>
								<div
									className={`
                  w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-indigo-300 rounded-full peer 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600
                `}
								></div>
								<span className="ml-3 text-sm font-medium text-gray-700">
									{isSelected ? "Selected" : "Select"}
								</span>
							</label>
						)}
					</div>
				</div>
				<p className="text-gray-600 text-sm mt-2">
					{course.description || "No description available"}
				</p>
				<div className="mt-3 flex items-center">
					<span
						className={`px-2 py-1 text-xs rounded-full ${
							course.semester === "1st"
								? "bg-green-100 text-green-800"
								: "bg-blue-100 text-blue-800"
						}`}
					>
						{course.semester} Semester
					</span>
				</div>
			</div>
		</motion.div>
	);
};

const CourseRegistration = () => {
	const [compulsoryCourses, setCompulsoryCourses] = useState([]);
	const [electiveCourses, setElectiveCourses] = useState([]);
	const [selectedElectives, setSelectedElectives] = useState([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await studentService.getOfferableCourses();

				setCompulsoryCourses(response.compulsory || []);
				setElectiveCourses(response.electives || []);
			} catch (err) {
				console.error("Error fetching courses:", err);
				setError("Failed to load available courses. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	const handleElectiveToggle = (courseId) => {
		setSelectedElectives((prev) => {
			if (prev.includes(courseId)) {
				return prev.filter((id) => id !== courseId);
			} else {
				return [...prev, courseId];
			}
		});
	};

	const handleSubmit = async () => {
		try {
			setSubmitting(true);
			setError(null);
			setSuccess(false);

      console.log(selectedElectives)
			// Compulsory courses are automatically added by the backend
      const p = await studentService.registerCourses(selectedElectives);
      console.log({ p })

			setSuccess(true);

			// Scroll to top to show success message
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (err) {
			console.error("Error registering courses:", err);
			setError("Failed to register courses. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<div className="flex flex-col items-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
					<p className="mt-3 text-gray-600">Loading available courses...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8"
			>
				<h1 className="text-3xl font-bold text-gray-800">
					Course Registration
				</h1>
				<p className="text-gray-600 mt-1">
					Register for this semester's courses. Compulsory courses are
					automatically included.
				</p>
			</motion.div>

			<AnimatePresence>
				{error && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
						role="alert"
					>
						<p className="font-bold">Error</p>
						<p>{error}</p>
					</motion.div>
				)}

				{success && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
						role="alert"
					>
						<p className="font-bold">Success!</p>
						<p>Your courses have been registered successfully.</p>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Registration summary */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">
					Registration Summary
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="bg-indigo-50 rounded-lg p-4">
						<p className="text-sm text-gray-600">Compulsory Courses</p>
						<p className="text-2xl font-bold text-indigo-700">
							{compulsoryCourses.length}
						</p>
					</div>
					<div className="bg-green-50 rounded-lg p-4">
						<p className="text-sm text-gray-600">Selected Electives</p>
						<p className="text-2xl font-bold text-green-700">
							{selectedElectives.length}
						</p>
					</div>
					<div className="bg-purple-50 rounded-lg p-4">
						<p className="text-sm text-gray-600">Total Courses</p>
						<p className="text-2xl font-bold text-purple-700">
							{compulsoryCourses.length + selectedElectives.length}
						</p>
					</div>
				</div>
			</div>

			{/* Compulsory courses */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Compulsory Courses
				</h2>
				{compulsoryCourses.length === 0 ? (
					<p className="text-gray-500 italic">
						No compulsory courses available for this semester.
					</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{compulsoryCourses.map((course) => (
							<CourseCard
								key={course.course_id}
								course={course}
								isSelected={true}
								onToggle={() => {}}
								isCompulsory={true}
							/>
						))}
					</div>
				)}
			</section>

			{/* Elective courses */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Elective Courses
				</h2>
				{electiveCourses.length === 0 ? (
					<p className="text-gray-500 italic">
						No elective courses available for this semester.
					</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{electiveCourses.map((course) => (
							<CourseCard
								key={course.course_id}
								course={course}
								isSelected={selectedElectives.includes(course.course_id)}
								onToggle={handleElectiveToggle}
								isCompulsory={false}
							/>
						))}
					</div>
				)}
			</section>

			{/* Submit button */}
			<div className="flex justify-end mt-6">
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleSubmit}
					disabled={submitting}
					className={`
            px-6 py-3 rounded-md text-white font-medium
            ${
							submitting
								? "bg-gray-400 cursor-not-allowed"
								: "bg-indigo-600 hover:bg-indigo-700"
						}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            transition-colors duration-200
          `}
				>
					{submitting ? (
						<div className="flex items-center">
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
							Processing...
						</div>
					) : (
						"Register Courses"
					)}
				</motion.button>
			</div>
		</div>
	);
};

export default CourseRegistration;
