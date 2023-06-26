# Gimhook Usage Documentation

If you want to make mods, you can find the documentation for that [here](../sdk/index.md).

## Documentation Pages

- [How to install Gimhook](usage.md)

# How does Gimhook work?

In modern JavaScript, there are modules which can be defined and later imported.

Here's an example of an ESM module which we'll give the filename `add.js`:

```javascript
function add(a, b) {
	return a + b;
}

export default add;
```

..and here's an example of a module that uses it:

```javascript
import add from './add';

console.log(add(2, 2)); // 4
```

However, modern web apps don't just use modules directly in the browser - They use a bundler to implement `require()` and bundle all of the dependencies they need into a single JavaScript file.

Gimhook works by hooking onto parcel's implementation of `require()` (which Gimkit uses) and intercepting the imported modules to replace them with something else, allowing Gimkit to turn modules into global variables and inject modifications into the Gimkit web client.

Think of it as replacing the add function with something entirely different when it tries to use it. ;)

Also keep in mind that this is all done client-side, so it doesn't touch anything on Gimkit's servers. **Your mods only are only on your client unless you share them and someone else installs it on their client.**

As for the desktop app part... that's just done with electron.