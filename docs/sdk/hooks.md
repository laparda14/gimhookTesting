# Gimhook hook types

The hook types mentioned below can be used to hook into specific parts of the game with callback functions.  

`internal` hooks are only meant to be used internally. **Do not use them.** They are only included here for reference.

All of these hooks can be used via `gimhook.addHook` - Look at [the API documentation](api.md) for more information.

## require

Module: `parcel`  
Type: `internal`  
Callback arguments: `string` (name)   
Callback output: `Module | undefined` (not sure if this the real type name)  

`require()` hooks are used to intercept and modify javascript modules used within Gimkit.  

Don't use this in your mods, this isn't meant for that.  

## message

Module: `game`  
Type: `external`  
Callback arguments: `string` (message type), `any` (data)   
Callback output: `boolean | undefined` (if the function returns true, other handlers are skipped)  

Used for intercepting colyseus messages. **Currently broken.**

## join

Module: `game`  
Type: `external`  
Callback arguments: N/A   
Callback output: N/A  

Used to allow mods to handle joining a game with custom code.