import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from "./App";
import "./global.css";

createRoot(
	document.getElementById("root")
).render(
	<StrictMode>
		<App />
	</StrictMode>
);

serviceWorkerRegistration.register({
	onUpdate: sw => console.log('SW Update', sw),
	onSuccess: sw => console.log('SW Success', sw)
});