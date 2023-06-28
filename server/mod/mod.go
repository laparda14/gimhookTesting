package mod

import (
	"errors"
)

type Mod struct {
	FormatVersion int      `json:"formatVersion"`
	Production    bool     `json:"production"`
	Name          string   `json:"name"`
	Slug          string   `json:"slug"`
	Description   string   `json:"description"`
	Version       string   `json:"version"`
	Author        string   `json:"author"`
	License       string   `json:"license"`
	Dependencies  []string `json:"dependencies"`
}

func CreateModFromPackageJSON(jsonData map[string]interface{}) (Mod, error) {
	var mod Mod

	mod.FormatVersion = 1
	mod.Production = true // The buildbot never creates development builds

	// Safely copy metadata from package.json

	name, ok := jsonData["name"]

	if !ok {
		return mod, errors.New("\"name\" does not exist in package.json")
	}

	switch name.(type) {
	case string:
		break
	default:
		return mod, errors.New("\"name\" has an invalid type, see package.json for more info")
	}

	mod.Name = name.(string)

	if mod.Name == "" {
		return mod, errors.New("\"name\" is blank")
	}

	slug, ok := jsonData["slug"]

	if !ok {
		return mod, errors.New("\"slug\" does not exist in package.json")
	}

	switch slug.(type) {
	case string:
		break
	default:
		return mod, errors.New("\"slug\" has an invalid type, see package.json for more info")
	}

	mod.Slug = slug.(string)

	if mod.Slug == "" {
		return mod, errors.New("\"slug\" is blank")
	}

	description, ok := jsonData["description"]

	if !ok {
		return mod, errors.New("\"description\" does not exist in package.json")
	}

	switch description.(type) {
	case string:
		break
	default:
		return mod, errors.New("\"description\" has an invalid type, see package.json for more info")
	}

	mod.Description = description.(string)

	if mod.Description == "" {
		return mod, errors.New("\"description\" is blank")
	}

	version, ok := jsonData["version"]

	if !ok {
		return mod, errors.New("\"version\" does not exist in package.json")
	}

	switch version.(type) {
	case string:
		break
	default:
		return mod, errors.New("\"version\" has an invalid type, see package.json for more info")
	}

	mod.Version = version.(string)

	if mod.Version == "" {
		return mod, errors.New("\"version\" is blank")
	}

	author, ok := jsonData["author"]

	if !ok {
		return mod, errors.New("\"author\" does not exist in package.json")
	}

	switch author.(type) {
	case string:
		break
	default:
		return mod, errors.New("\"author\" has an invalid type, see package.json for more info")
	}

	mod.Author = author.(string)

	if mod.Author == "" {
		return mod, errors.New("\"author\" is blank")
	}

	license, ok := jsonData["license"]

	if !ok {
		return mod, errors.New("\"license\" does not exist in package.json")
	}

	switch license.(type) {
	case string:
		break
	default:
		return mod, errors.New("\"license\" has an invalid type, see package.json for more info")
	}

	mod.License = license.(string)

	if mod.License == "" {
		return mod, errors.New("\"license\" is blank")
	}

	modDependencies, ok := jsonData["modDependencies"]

	if !ok {
		return mod, errors.New("\"modDependencies\" does not exist in package.json")
	}

	switch modDependencies := modDependencies.(type) {
	case []string:
		mod.Dependencies = modDependencies
	case map[string]interface{}:
		mod.Dependencies = []string{}
	default:
		return mod, errors.New("\"modDependencies\" has an invalid type, see package.json for more info")
	}

	return mod, nil
}
