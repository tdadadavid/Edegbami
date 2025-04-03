// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";

// Make sure this matches the element ID in your index.html
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);