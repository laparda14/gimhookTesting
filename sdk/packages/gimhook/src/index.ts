const esbuild = require('esbuild');
const { createSpinner } = require('nanospinner');
const path = require('path');
const fs = require('fs');

let usageText = `Usage:
	gimhook build [project path, or blank] - Builds a gimhook mod`;

function build(sourceDirectory, production) {
	// Start the spinner

	const spinner = createSpinner("Building project...").start({ color: "cyan" });

	// Load package.json

	if (!fs.existsSync(path.join(sourceDirectory, "./package.json"))) {
		spinner.error({ text: "Failed to find package.json!" });
		process.exit(1);
	}

	const metadata = JSON.parse(fs.readFileSync(path.join(sourceDirectory, "./package.json")));

	if (!("main" in metadata) || metadata.main === "") {
		spinner.error({ text: "\"main\" value not specified in package.json!" });
	}
	
	// Create the mod metadata object

	let modMetadata = {name: path.basename(sourceDirectory), description: "", version: "1.0.0", author: "unknown", license: "unknown"};

	// Safely copy metadata from package.json when possible

	if (typeof metadata.name !== "undefined" && metadata.name !== "") {
		modMetadata.name = metadata.name;
	}

	if (typeof metadata.description !== "undefined" && metadata.description !== "") {
		modMetadata.description = metadata.description;
	}

	if (typeof metadata.version !== "undefined" && metadata.version !== "") {
		modMetadata.version = metadata.version;
	}

	if (typeof metadata.author !== "undefined" && metadata.author !== "") {
		modMetadata.author = metadata.author;
	}

	if (typeof metadata.license !== "undefined" && metadata.license !== "") {
		modMetadata.license = metadata.license;
	}

	// Build the project with esbuild

	try {
		esbuild.buildSync({
			entryPoints: [path.join(sourceDirectory, metadata.main)],
			bundle: true,
			minify: production,
			platform: "browser",
			format: "iife",
			banner: {
				js: "// gimhook: " + JSON.stringify(modMetadata)
			},
			logLevel: "silent",
			outfile: path.join(sourceDirectory, "./dist/index.js"),
		});

		spinner.success({ text: "Finished!" });

		if (!production) {
			console.log("\nWARNING: This is a development build. Do not use it in production. If you meant to create a production build, add the \"--production\" build flag or use \"npm run dist\" instead of \"npm run build\" if you created your project with create-gimhook.");
		}
	} catch (e) {
		spinner.error({ text: `Build error: ${e.errors[0].text}` });
		process.exit(1);
	}
}

function usage() {
	console.log(usageText);
	process.exit(1);
}

function main() {
	let args = process.argv.slice(2);

	if (args.length === 0) {
		usage();
	}

	let command = args[0];

	if (command === "build") {
		// --production

		let production = false;

		// If a path is specified, use that as the project directory.

		if (args.length !== 1 && args[1] !== "--production") {
			if (args.length === 3 && args[2] === "--production") {
				production = true;
			}

			build(path.resolve(args[1]), production);
			return;
		}

		// Otherwise, build the project in the current working directory.

		if (args.length === 2 && args[1] === "--production") {
			production = true;
		}

		build(process.cwd(), production);

		return;
	}

	usage();
}

if (require.main === module) {
	main();
}

module.exports = {
	build,
	main
};