/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class", // Enable dark mode with class strategy
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
			},
			colors: {
				// Vercel-inspired color palette (minimal black & white with accents)
				vercel: {
					50: "#fafafa",
					100: "#eaeaea",
					200: "#999999",
					300: "#888888",
					400: "#666666",
					500: "#444444",
					600: "#333333",
					700: "#222222",
					800: "#111111",
					900: "#000000",
				},
				accent: {
					light: "#000000",
					dark: "#ffffff",
				},
			},
			boxShadow: {
				vercel: "0 2px 10px rgba(0, 0, 0, 0.05)",
				"vercel-dark": "0 2px 10px rgba(0, 0, 0, 0.2)",
			},
			animation: {
				"fade-in": "fadeIn 0.5s ease-in-out",
				"slide-up": "slideInUp 0.5s ease-out",
				"slow-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
			transitionProperty: {
				height: "height",
				spacing: "margin, padding",
			},
		},
	},
	plugins: [],
};
