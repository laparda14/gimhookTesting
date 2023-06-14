const { app, shell, BrowserWindow, ipcMain, dialog } = require('electron');
const { getDatabase, loadDatabase, rebuildPreload, getPreload, installMod, removeMod, disableMod, enableMod } = require('./database');
const path = require('path');

let debugMode = false;

if (process.env.HTTP_PROXY) {
	app.commandLine.appendSwitch("proxy-server", process.env.HTTP_PROXY);
}

if (process.env.HTTPS_PROXY) {
	app.commandLine.appendSwitch("proxy-server", process.env.HTTPS_PROXY);
}

loadDatabase();
rebuildPreload();

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
		show: false,
		webPreferences: {
			contextIsolation: false, // We need to disable context isolation so that gimhook will actually work
			preload: getPreload()
		}
	});

	setTimeout(() => {
		window.webContents.send("database-update", getDatabase());
		window.show();
	}, 500);

	ipcMain.on("open-external", (event, url) => {
		shell.openExternal(url);
	});

	ipcMain.on("select-mods", async (event) => {
		// Don't allow m
		if (!window.webContents.getURL().startsWith("file://")) {
			return;
		}

		const response = await dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] });

		if (response.canceled) {
			console.info("Gimhook: Mod selection cancelled");
			return;
		}

		response.filePaths.forEach(filename => {
			installMod(window, filename);
		});
	});

	ipcMain.on("remove-mod", (event, name) => {
		removeMod(window, name);
	});

	ipcMain.on("enable-mod", (event, name) => {
		enableMod(window, name);
	});

	ipcMain.on("disable-mod", (event, name) => {
		disableMod(window, name);
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