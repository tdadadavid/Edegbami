// src/api/index.js
import axios from "axios";

// Create an axios instance with default settings
const apiClient = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: true, // Important for cookie-based auth
	headers: {
		"Content-Type": "application/json",
	},
});

// Authentication services
export const authService = {
	// Register a new student
	signup: async (userData) => {
		try {
			const response = await apiClient.post("/auth/signup", userData);
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	// Login user
	login: async (credentials) => {
		try {
			const response = await apiClient.post("/auth/login", credentials);
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	// Logout user
	logout: async () => {
		try {
			const response = await apiClient.post("/auth/logout");
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},
};

// Student services
export const studentService = {
	// Get student profile
	getProfile: async () => {
		try {
			const response = await apiClient.get("/student/profile");
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	// Get available courses for registration
	getOfferableCourses: async () => {
		try {
			const response = await apiClient.get("/student/offerable-courses");
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
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
			throw error.response?.data || error;
		}
	},

	// Get student CGPA
	getCGPA: async () => {
		try {
			const response = await apiClient.get("/student/cgpa");
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	// Get transcript (PDF)
	downloadTranscript: () => {
		// Open transcript in a new tab/window for download
		window.open(`${apiClient.defaults.baseURL}/student/transcript`, "_blank");
	},
};

// Request interceptor for adding auth token to requests
apiClient.interceptors.request.use(
	(config) => {
		// We don't need to add the token manually since we're using HttpOnly cookies
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle 401 Unauthorized errors (token expired, etc.)
		if (error.response && error.response.status === 401) {
			// Redirect to login page
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default apiClient;
