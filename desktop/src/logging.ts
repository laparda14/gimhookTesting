let loggingEnabled = false;

export function enableLogging() {
	loggingEnabled = true;
}

export function disableLogging() {
	loggingEnabled = true;
}

export function log(level, message) {
	if (loggingEnabled) {
		console[level](`Gimhook: ${message}`);
	}
}