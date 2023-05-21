declare var gimhook: any;

function setupParcel() {
	//
	// Parcel require() hook
	//

	// this part is directly copied from parcel
	// it seems like literally *anything* else won't work

	let _parcelModuleCache = {};
	let _parcelModules = {}
	let requireHook = null;

	((requireHook = function(moduleName) {
		if (moduleName in _parcelModuleCache) {
			return _parcelModuleCache[moduleName].exports;
		}

		if (moduleName in _parcelModules) {
			let moduleCallback = _parcelModules[moduleName];
			delete _parcelModules[moduleName];

			let moduleObject = {
				id: moduleName,
				exports: {}
			};

			_parcelModuleCache[moduleName] = moduleObject;

			moduleCallback.call(moduleObject.exports, moduleObject, moduleObject.exports);

			let hooks = gimhook.getHooks("require");

			for (let i = 0; i < hooks.length; i++) {
				let transformedModule = hooks[i](moduleObject);

				if (typeof transformedModule !== "undefined") {
					return transformedModule.exports;
				}
			}

			return moduleObject.exports;
		}

		throw new Error("Cannot find module '" + moduleName + "'");
	}
	// @ts-ignore
	).register = function(moduleName, moduleCallback) {
		_parcelModules[moduleName] = moduleCallback;
	});

	Object.defineProperty(globalThis, "parcelRequire388b", {
		get() {
			return requireHook;
		},

		set(value) {
			return; // Don't allow parcel to overwrite our hook, *ever*
		}
	});
}

export default setupParcel;