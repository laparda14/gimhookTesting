declare var gimhook: any;

function setupUI() {
	// Use the require() hook to make React into a global variable

	gimhook.addHook("require", (moduleObject) => {
		if (typeof moduleObject.exports !== "object") {
			return; // We only want objects for the exports value
		}

		if (!("createElement" in moduleObject.exports && "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED" in moduleObject.exports)) {
			return; // We only want the module that we are looking for
		}
		
		// If this is the module that we want, then make it global

		console.log(`Gimhook (ui): Detected React instance in ${moduleObject.id}`);

		globalThis.React = moduleObject.exports;
	});
}

export default setupUI;