# Gimhook SDK

This is the SDK for Gimhook. It contains everything that you need to make and publish a gimhook mod.

# How do I use it?

(Remember: This is only officially supported on linux; other platforms might not work, and I'm not able to test this on other platforms so I can't properly fix it if it's broken on another platform)

First of all, you need Node.js installed. Install Node.js if you don't already have it.

Then, create a new directory and run `npm init gimhook@latest` inside of it to bootstrap a new mod.

Once you've created it, edit the code and add the features you want into your mod.

Documentation on how to make Gimhook mods can be found [here](../docs/index.md).

When you're ready to test it, run `npm run build` to create a development build of the mod and then import `dist/index.js` into the Gimhook desktop app.