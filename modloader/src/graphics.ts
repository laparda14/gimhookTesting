declare var gimhook: any;

function phaserCheck() {
	if (typeof globalThis.Phaser === "undefined") {
		throw new Error("Attempted to use gimhook.graphics before Phaser is loaded! Is this a non-2D gamemode?");
	}
}

function setupGraphics() {
	// First of all, we need to setup the graphics-related stuff in the gimhook object.

	gimhook.graphics = {camera: {}, player: {}};

	// Then, use a require() hook to expose the phaser instance (not the main Phaser object, that's already global)

	gimhook.addHook("require", (moduleObject) => {
		if (typeof moduleObject.exports !== "object") {
			return; // We only want objects for the exports value
		}

		if (!("default" in moduleObject.exports && typeof moduleObject.exports.default === "object")) {
			return; // We only want the module that we are looking for
		}

		if (!(moduleObject.exports.default !== null && "phaser" in moduleObject.exports.default)) {
			return; // We still only want the module that we are looking for
		}
		
		// If this is the module that we want, then grab the phaser instance and make it global

		console.log(`Gimhook (graphics): Detected Phaser instance in ${moduleObject.id}`);

		gimhook.graphics.phaserInstance = moduleObject.exports.default.phaser;

		return moduleObject;
	});

	// Also, define some gimhook functions for graphics while we're at it:

	// Player

	gimhook.graphics.player.getPlayer = () => {
		phaserCheck();
		return gimhook.graphics.phaserInstance.mainCharacter;
	};

	gimhook.graphics.player.getPosition = () => {
		phaserCheck();
		return gimhook.graphics.player.getPlayer().body.pos;
	};

	gimhook.graphics.player.setPosition = (x, y) => {
		phaserCheck();
		return gimhook.graphics.player.getPlayer().body.setPosition(x, y);
	};

	// Camera

	gimhook.graphics.camera.getCamera = () => {
		phaserCheck();
		return gimhook.graphics.phaserInstance.scene.cameras.cameras[0];
	};

	gimhook.graphics.camera.getZoom = () => {
		phaserCheck();
		return gimhook.graphics.camera.getCamera().zoom;
	};

	gimhook.graphics.camera.setZoom = (zoom) => {
		phaserCheck();
		gimhook.graphics.camera.getCamera().setZoom(zoom);
	};

	gimhook.graphics.coords.screenToGame = (screenX, screenY, playerX, playerY, width, height, zoom) => {
	        var term = (screenX - (width/2))/width;
	        var x = playerX + (width/2) * (term * (1/zoom) * 2);
	
	        var term = (screenY - (height/2))/height;
	        var y = playerY + (height/2) * (term * (1/zoom) * 2);
	
		return [x, y];
	};
}

export default setupGraphics;
