# Gimhook API

All APIs mentioned below are in the global scope.

If you need to use React, it's included in the global scope - You can just use the `React` variable anywhere.

**NOTE**: The Gimhook SDK currently isn't able to replace React imports in mods with a wrapper for the global variable. Please don't import it.

## gimhook.getHooks

Module: `core`  
Type: `Function`  
Input type: `string`  
Output type: `string[]`  

`gimhook.getHooks` is used to get all of the hook callbacks, given a hook name.

## gimhook.addHook

Module: `core`  
Type: `Function`  
Input type: `string`, `Function`   
Output type: N/A  

`gimhook.addHook` is used to add a callback function to a hook, which is called whenever the hook is triggered.

## gimhook.game.isGameActive

Module: `game`  
Type: `boolean`  
Input type: N/A  
Output type: N/A  

`gimhook.game.isGameActive` is used to determine when a game is currently active.

## gimhook.game.is2DGamemode

Module: `game`  
Type: `boolean`  
Input type: N/A  
Output type: N/A  

`gimhook.game.is2DGamemode` is used to determine if the active gamemode (if any) is a 2D gamemode.

## gimhook.graphics.player.getPlayer

Module: `core`  
Type: `Function`  
Input type: N/A  
Output type: Player (I don't know the TypeScript type for it)  

`gimhook.graphics.player.getPlayer` is used to get the currently active player.

## gimhook.graphics.player.getPosition

Module: `core`  
Type: `Function`  
Input type: N/A  
Output type: Position (I don't know the TypeScript type for it)  

`gimhook.graphics.player.getPosition` is used to get the position of the currently active player.

## gimhook.graphics.player.setPosition

Module: `core`  
Type: `Function`  
Input type: `number`, `number`  
Output type: N/A  

`gimhook.graphics.player.setPosition` is used to set the position of the currently active player.  

NOTE: No, you can't use this to teleport around the map and cheat. It is useless unless you're in the creative map editor.

## gimhook.graphics.camera.getCamera

Module: `core`  
Type: `Function`  
Input type: N/A  
Output type: Camera (I don't know the TypeScript type for it)  

`gimhook.graphics.camera.getCamera` is used to get the currently active camera.

## gimhook.graphics.camera.getZoom

Module: `core`  
Type: `Function`  
Input type: N/A  
Output type: `number`  

`gimhook.graphics.camera.getZoom` is used to get the zoom value of the currently active camera.

## gimhook.graphics.camera.setZoom

Module: `core`  
Type: `Function`  
Input type: `number`  
Output type: N/A  

`gimhook.graphics.camera.setZoom` is used to set the zoom value of the currently active camera.