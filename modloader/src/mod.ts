class Mod {
	name: string;
	private _options: any;

	constructor(metadata: any) {
		this.name = metadata.name;
		this._options = metadata.options;
	}

	getOption(name: string): string | number | undefined {
		if (!(name in this._options)) {
			return undefined;
		}

		if (this._options[name] === null) {
			return undefined;
		}

		return this._options[name];
	}
}

export default Mod;