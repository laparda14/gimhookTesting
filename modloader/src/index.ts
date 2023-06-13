// Define some basic hooks and the interface for them
// Keep in mind that this can be easily detected by Gimkit, but it likely won't be part of their cheat detector because this is not a cheat.

import setupCore from './core';
import setupParcel from './parcel';
import setupUI from './ui';
import setupGame from './game';
import setupGraphics from './graphics';

declare var gimhook: any;

globalThis.gimhook = {
	_finishedLoadingGimhook: false
}

console.log("=== Gimhook v0.0.1 ===");

// do some electron-specific stuff if we're using electron

gimhook.openModSelectionDialog = () => {};

if (navigator.userAgent.includes("gimhook")) {
	const { ipcRenderer } = require('electron');

	// On the electron app, we need to overwrite window.open so it doesn't open a new electron window when you click things on the Gimkit dashboard.
	// @ts-ignore
	window.open = (url: string) => {
		// if the URL is external, open it in a new browser window

		if (new URL(url).host !== "gimkit.com") {
			ipcRenderer.send("open-external", url);
			return;
		}

		location.href = url;
	}

	gimhook.openModSelectionDialog = () => {
		ipcRenderer.send("select-mods");
	}
}

// load all of the different modules

console.log("Gimhook: loading core module...");

setupCore();

console.log("Gimhook: loading parcel module...");

setupParcel();

console.log("Gimhook: loading UI module...");

setupUI();

console.log("Gimhook: loading game module...");

setupGame();

console.log("Gimhook: loading graphics module...");

setupGraphics();

console.log("Gimhook: Finished loading Gimhook!");

gimhook._finishedLoadingGimhook = true;