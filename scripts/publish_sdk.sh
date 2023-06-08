#!/bin/sh

# This script is used to publish the SDK packages to npm.
# You won't ever need to use this script, it's only used by hexaheximal.

cd sdk/packages

cd gimhook; npm publish; cd ..
cd create-gimhook; npm publish; cd ..

cd ../..