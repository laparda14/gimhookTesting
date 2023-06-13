const { app, shell, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const gimhookDirectory = path.join(app.getPath("appData"), "gimhook");
const gimhookModDirectory = path.join(gimhookDirectory, "mods");

// Create the gimhook directories if they don't already exist.

if (!fs.existsSync(gimhookDirectory)) {
	fs.mkdirSync(gimhookDirectory);
}

if (!fs.existsSync(gimhookModDirectory)) {
	fs.mkdirSync(gimhookModDirectory);
}

let debugMode = false;

if (process.env.HTTP_PROXY) {
	app.commandLine.appendSwitch("proxy-server", process.env.HTTP_PROXY);
}

if (process.env.HTTPS_PROXY) {
	app.commandLine.appendSwitch("proxy-server", process.env.HTTPS_PROXY);
}

process.argv.forEach(arg => {
	if (arg === "--debug-mode") {
		debugMode = true;
	}
});

if (debugMode) {
	console.info("Gimhook: Debug mode is enabled");
}

const createWindow = () => {
	const window = new BrowserWindow({
		width: 1280,
		height: 720,
		title: "Gimhook",
		webPreferences: {
			contextIsolation: false, // We need to disable context isolation so that gimhook will actually work
			preload: path.join(__dirname, "modloader.js")
		}
	});

	ipcMain.on("open-external", (event, url) => {
		shell.openExternal(url);
	});

	ipcMain.on("select-mods", async (event) => {
		const response = await dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] });

		if (response.canceled) {
			console.info("Gimhook: Mod selection cancelled");
			return;
		}

		response.filePaths.forEach(filename => {
			fs.copyFileSync(filename, path.join(gimhookModDirectory, path.basename(filename)));
			console.info(`Gimhook: Installed ${filename}`);
		});
	});

	window.on("page-title-updated", (e) => {
		e.preventDefault();
	});

	window.removeMenu();

	if (debugMode) {
		window.openDevTools();
	}

	window.loadFile(path.join(__dirname, "./ui/index.html"));
};

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});