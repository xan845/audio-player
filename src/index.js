// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from "./App";
import "./global.css";


const audio = new Audio();

if (!indexedDB)
	throw new Error('IDB-API Not Supported!');

const request = indexedDB.open('TrackDB');

request.onerror = ev => {
	console.log(ev.target.error);
	createRoot(document.getElementById("root"))
		.render(<main className="player">Critical Fetures not supported or may be disabled!</main>);
};

request.onupgradeneeded = ev => {
	if (!ev.target?.result.objectStoreNames.contains('Tracks'))
		ev.target.result.createObjectStore('Tracks', { keyPath: 'name' });
};

request.onsuccess = ev => {
	createRoot(document.getElementById("root"))
		.render(<App audio={audio} idb={ev.target.result} />);
};

serviceWorkerRegistration.register({
	onUpdate: sw => console.log('SW Update', sw),
	onSuccess: sw => console.log('SW Success', sw)
});