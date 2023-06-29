# Upgrading the Gimhook SDK

You're probably here because you saw this error message:

```
[filename] does not contain a valid formatVersion value. This most likely means that the mod was made with an older SDK version.
```

That error is not a bug, it was intentionally added to force mod developers to stop using really old SDK versions.

## So, how do I upgrade the SDK?

First of all, you need to know which version to upgrade to.

The latest SDK version can be found [here](https://www.npmjs.com/package/gimhook).
If you are using TypeScript, you should also go [here](https://www.npmjs.com/package/typescript) to find the latest TypeScript version.

Once you know which version to upgrade to, edit your package.json file to use it.

For example, to upgrade from 0.0.1 to 0.0.12, this:

```json
{
	...
	"devDependencies": {
		"gimhook": "^0.0.1"
	}
}
```

...would become this:

```json
{
	...
	"devDependencies": {
		"gimhook": "^0.0.12"
	}
}
```

After that, run `npm i` to install the upgraded packages.

Then, run `npm run dist` to rebuild your mod.

## Additional changes you might need to make when upgrading

1. If the dist script in package.json is `tsc && gimhook build --production`, change it to `gimhook build --production --typecheck`
2. If you haven't defined a `slug` value, define it after `name`. The slug value is a version of the mod name that only contains lowercase letters, numbers, and dashes.
3. If you haven't defined a `modDependencies` value, define it after `devDependencies`. It's value should be `[]`.
4. If `src/index.ts` exists, rename it to `src/index.tsx` and update the `main` value in package.json.