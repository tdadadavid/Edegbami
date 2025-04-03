// src/api/index.js
import axios from "axios";

// Create an axios instance with default settings
const apiClient = axios.create({
	baseURL: "https://csc419.onrender.com",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 15000, // 15 seconds
});

// Helper to check if we're in development mode
const isDevelopment =
	import.meta.env.DEV || import.meta.env.MODE === "development";

// Authentication services
export const authService = {
	// Register a new student
	signup: async (userData) => {
		try {
			const response = await apiClient.post("/auth/signup", userData);
			return response.data;
		} catch (error) {
			console.error("Signup error:", error);
			throw error;
		}
	},

	// Login user
	login: async (credentials) => {
		try {
			const response = await apiClient.post("/auth/login", credentials);
			return response.data;
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	},

	// Logout user
	logout: async () => {
		try {
			const response = await apiClient.post("/auth/logout");
			return response.data;
		} catch (error) {
			console.error("Logout error:", error);
			throw error;
		}
	},
};

// Mock data for development
const mockStudentProfile = {
	id: "12345",
	firstname: "John",
	lastname: "Doe",
	email: "john.doe@example.com",
	department_id: "CSC",
	level: "300",
	phonenumber: "1234567890",
};

// Student services
export const studentService = {
	// Get student profile
	getProfile: async () => {
		try {
			// For development, return mock data if API fails
			if (isDevelopment) {
				try {
					const response = await apiClient.get("/student/profile");
					return response.data;
				} catch (error) {
					console.warn("Using mock profile data in development mode");
					return mockStudentProfile;
				}
			} else {
				// In production, actually make the API call
				const response = await apiClient.get("/student/profile");
				return response.data;
			}
		} catch (error) {
			console.error("Get profile error:", error);
			throw error;
		}
	},

	// Get available courses for registration
	getOfferableCourses: async () => {
		try {
			const response = await apiClient.get("/student/offerable-courses");
			return response.data;
		} catch (error) {
			console.error("Get courses error:", error);

			// For development, return mock data if API fails
			if (isDevelopment) {
				return {
					compulsory: [
						{
							course_id: 1,
							course_name: "Introduction to Programming",
							code: "CSC101",
							unit: 3,
							semester: "1st",
						},
						{
							course_id: 2,
							course_name: "Calculus I",
							code: "MTH101",
							unit: 4,
							semester: "1st",
						},
					],
					electives: [
						{
							course_id: 3,
							course_name: "Introduction to Psychology",
							code: "PSY101",
							unit: 2,
							semester: "1st",
						},
						{
							course_id: 4,
							course_name: "Creative Writing",
							code: "ENG102",
							unit: 3,
							semester: "2nd",
						},
					],
				};
			}

			throw error;
		}
	},

	// Register for courses
	registerCourses: async (electiveCourseIds) => {
		try {
			const response = await apiClient.post("/student/register-courses", {
				electiveCourseIds,
			});
			return response.data;
		} catch (error) {
			console.error("Register courses error:", error);
			throw error;
		}
	},

	// Get student CGPA
	getCGPA: async () => {
		try {
			const response = await apiClient.get("/student/cgpa");
			return response.data;
		} catch (error) {
			console.error("Get CGPA error:", error);

			// For development, return mock data if API fails
			if (isDevelopment) {
				return { cgpa: 3.75 };
			}

			throw error;
		}
	},

	// Get transcript (PDF)
	downloadTranscript: () => {
		window.open(`${apiClient.defaults.baseURL}/student/transcript`, "_blank");
	},
};

// Request interceptor
apiClient.interceptors.request.use(
	(config) => {
		console.log(
			`Making ${config.method.toUpperCase()} request to: ${config.url}`
		);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Don't redirect on 401 from auth endpoints
		if (error.response && error.response.status === 401) {
			const isAuthEndpoint =
				error.config.url.includes("/auth/login") ||
				error.config.url.includes("/auth/signup");

			if (!isAuthEndpoint) {
				localStorage.removeItem("isLoggedIn");
				if (!window.location.pathname.includes("/auth")) {
					window.location.href = "/auth";
				}
			}
		}
		return Promise.reject(error);
	}
);

export default apiClient;
