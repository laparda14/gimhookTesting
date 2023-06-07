# Gimhook Documentation

**NOTE: If you just want to play mods and you don't want to make them, this is not for you.**

## Documentation Pages

- [Gimhook API](api.md)
- [Gimhook hook types](hooks.md)

## What Gimhook is, and what it isn't

**What it is:**

- A modloader and desktop app for Gimkit
- A simple API for building Gimkit mods
- Designed for improving the Gimkit Creative map editor

**What it isn't:**

- Useful for cheating
- A tool for using custom assets in Gimkit Creative
- Built for non-2D gamemodes

## Why not custom assets?

There are 2 reasons, one being technical, and another being non-technical.

The first reason is that the modloader loads mods as javascript files, and doesn't have a way (other than base64 URLs, but that would destroy the file size of mods) to load any mod assets.

The second reason, which Josh himself has even told me (and I agree with), is that it could lead to seriously problematic assets being used. Team Fortress 2 has suffered from this problem already with it's custom image features.