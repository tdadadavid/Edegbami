import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
	theme: "light",
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		// First, check localStorage
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) return savedTheme;

		// If no saved preference, check system preference
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	});

	useEffect(() => {
		const root = window.document.documentElement;

		// Remove both classes
		root.classList.remove("light", "dark");

		// Add the current theme class
		root.classList.add(theme);

		// Save to localStorage
		localStorage.setItem("theme", theme);
	}, [theme]);

	// Listen for system preference changes
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (e) => {
			// Only change if no explicit theme is set by user
			if (!localStorage.getItem("theme")) {
				setTheme(e.matches ? "dark" : "light");
			}
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
