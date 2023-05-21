declare var gimhook: any;

function setupCore() {
	// Create the core gimhook stuff

	globalThis.gimhook = {
		_hooks: {},
		_finishedLoadingGimhook: false
	};

	function getHooks(type: string) {
		if (!(type in gimhook._hooks)) {
			return [];
		}

		return gimhook._hooks[type];
	}

	function addHook(type: string, handler: Function) {
		if (gimhook._finishedLoadingGimhook && type === "require") {
			throw new Error("require() hooks are only meant to be used internally by Gimhook. Do not create them in your mods.");
		}

		if (!(type in gimhook._hooks)) {
			gimhook._hooks[type] = [handler];
			return;
		}

		gimhook._hooks[type].push(handler);
	}

	gimhook.getHooks = getHooks;
	gimhook.addHook = addHook;
}

export default setupCore;