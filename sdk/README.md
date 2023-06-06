# Gimhook SDK

This is the SDK for Gimhook. It contains everything that you need to make and publish a gimhook mod.

# How do I use it?

First of all, you need Node.js installed. Install Node.js if you don't already have it.

Then, create a new directory and run `npm init gimhook@latest` inside of it to bootstrap a new mod.

Once you've created it, edit the code and add the features you want into your mod.

Documentation for the Gimhook API can be found [here](../docs/api.md).

When you're ready to test it, run `npm run build` to create a development build of the mod and then import `dist/index.js` into the Gimhook desktop app.