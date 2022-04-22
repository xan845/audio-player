import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App";
import "./css/global.css";
import CustomContainer from "./CustomContainer";

createRoot(
	document.getElementById("root")
).render(
	<StrictMode>
		<CustomContainer />
	</StrictMode>
);
