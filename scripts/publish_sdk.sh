#!/bin/sh

# If we can find ourself, this script was run within the scripts directory.
# And if that's the case, we need to go to the parent directory for this to work properly.

if [ -f publish_sdk.sh ]
then
	cd ..
fi

# This script is used to publish the SDK packages to npm.
# You won't ever need to use this script, it's only used by hexaheximal.

cd sdk/packages

cd gimhook; npm publish; cd ..
cd create-gimhook; npm publish; cd ..

cd ../..