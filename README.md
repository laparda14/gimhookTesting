# Gimhook

A desktop app and modloader for Gimkit.

# How do I use this?

Currently, there aren't any CI builds - you'll need to compile Gimhook yourself if you want to use it.

Doing that is really simple though:

1. Install Node.JS if you don't already have it
2. Download this repository with `git clone` and enter it (**DO NOT** download a zip file for this repository from github - it won't work)
3. Run `./scripts/build.sh` to build the desktop app
4. Run `./scripts/run.sh` to run the desktop app
5. Profit.

# How do I make a mod?

While it is technically possible to write a Gimhook mod manually, the recommended way to do it is via the work-in-progress Gimhook SDK.

Read [the SDK documentation](sdk/README.md) for more information.

# Is this allowed on Gimkit?

The simplified answer is **yes, as long as you don't use it to cheat or otherwise do anything potentially problematic.**

Special thanks to Josh Feinsilber and Jeff Osborn for answering this question!

# How does this work?

In modern JavaScript, there are modules which can be defined and later imported.

Here's an example of a CommonJS module which we'll give the filename `add.js`:

```javascript
module.exports = (a, b) => {return a + b};
```

..and here's an example of a module that uses it:

```javascript
const add = require('./add');

console.log(add(2, 2)); // 4
```

However, modern web apps don't just use modules directly in the browser - They use a bundler to implement `require()` and bundle all of the dependencies they need into a single JavaScript file.

Gimhook works by hooking onto parcel's implementation of `require()` (which Gimkit uses) and intercepting the imported modules to replace them with something else, allowing Gimkit to turn modules into global variables and inject modifications into the Gimkit web client.

Think of it as replacing the add function with something entirely different when it tries to use it. ;)

Also keep in mind that this is all done client-side, so it doesn't touch anything on Gimkit's servers. **Your mods only are only on your client unless you share them and someone else installs it on their client.**

As for the desktop app part... that's just done with electron.