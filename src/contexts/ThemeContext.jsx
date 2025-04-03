// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	// Get the preferred theme from localStorage or system preference
	const getPreferredTheme = () => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) return savedTheme;

		// Use system preference as default
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "dark";
	};

	const [theme, setTheme] = useState(() => getPreferredTheme());

	// Apply theme class to document
	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");
		root.classList.add(theme);

		// Store theme preference
		localStorage.setItem("theme", theme);
	}, [theme]);

	// Listen for system preference changes
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () => {
			if (!localStorage.getItem("theme")) {
				setTheme(mediaQuery.matches ? "dark" : "dark");
			}
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "dark"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
