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
				// Vercel-inspired minimal color palette
				background: {
					light: "#ffffff",
					dark: "#0a0a0a",
				},
				foreground: {
					light: "#000000",
					dark: "#ffffff",
				},
				border: {
					light: "#eaeaea",
					dark: "#333333",
				},
				vercel: {
					gray: {
						50: "#fafafa",
						100: "#f5f5f5",
						200: "#e5e5e5",
						300: "#d4d4d4",
						400: "#a3a3a3",
						500: "#737373",
						600: "#525252",
						700: "#404040",
						800: "#262626",
						900: "#171717",
					},
					blue: {
						50: "#eff6ff",
						100: "#dbeafe",
						200: "#bfdbfe",
						300: "#93c5fd",
						400: "#60a5fa",
						500: "#3b82f6",
						600: "#2563eb",
						700: "#1d4ed8",
						800: "#1e40af",
						900: "#1e3a8a",
					},
				},
			},
			boxShadow: {
				soft: "0 2px 10px rgba(0, 0, 0, 0.05)",
				"soft-dark": "0 2px 10px rgba(255, 255, 255, 0.05)",
			},
			borderRadius: {
				"4xl": "2rem",
			},
			animation: {
				"fade-in": "fadeIn 0.3s ease-in-out",
				"slide-up": "slideInUp 0.3s ease-out",
			},
		},
	},
	plugins: [],
};
