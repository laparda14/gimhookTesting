# Gimhook

A desktop app and modloader for Gimkit.

# Is this allowed?

**Yes, as long as you limit your usage of this to only your own live games.**

# How do I make a mod?

While it is technically possible to write a Gimhook mod manually, the recommended way to do it is via the Gimhook SDK.

Read [this](sdk/README.md) for more information.

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

Gimhook works by hooking onto parcel's implementation of `require()` and intercepting calls to it.

Think of it as replacing the add function with something entirely different when it tries to use it. ;)