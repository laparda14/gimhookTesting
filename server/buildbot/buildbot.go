package buildbot

import (
	"encoding/json"
	"errors"
	"gimhook/mod"
	"os"
	"path/filepath"

	"github.com/evanw/esbuild/pkg/api"
)

func Build(path string) (string, error) {
	// Read the package.json file

	data, err := os.ReadFile(filepath.Join(path, "package.json"))

	if err != nil {
		return "", err
	}

	// Parse the package.json file

	var jsonData map[string]interface{}

	err = json.Unmarshal(data, &jsonData)

	if err != nil {
		return "", err
	}

	main, ok := jsonData["main"]

	if !ok {
		return "", errors.New("\"main\" does not exist in package.json")
	}

	switch main.(type) {
	case string:
		break
	default:
		return "", errors.New("\"main\" has an invalid type, see package.json for more info")
	}

	modMetadata, err := mod.CreateModFromPackageJSON(jsonData)

	if err != nil {
		return "", err
	}

	marshaledModMetadata, err := json.Marshal(modMetadata)
	marshaledModMetadataString := string(marshaledModMetadata)

	// Build it with esbuild
	// (yes, this was directly ported from the SDK)

	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{filepath.Join(path, main.(string))},
		Bundle:            true,
		MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		Platform:          api.PlatformBrowser,
		Format:            api.FormatIIFE,
		Alias: map[string]string{
			"react": "gimhook/react",
		},
		Banner: map[string]string{
			"js": "// gimhook: " + marshaledModMetadataString,
		},
		LogLevel: api.LogLevelSilent,
	})

	if len(result.Errors) != 0 {
		return "", errors.New(result.Errors[0].Text)
	}

	return string(result.OutputFiles[0].Contents), nil
}
