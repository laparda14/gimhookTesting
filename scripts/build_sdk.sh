#!/bin/sh

# If we can find ourself, this script was run within the scripts directory.
# And if that's the case, we need to go to the parent directory for this to work properly.

if [ -f build_sdk.sh ]
then
	cd ..
fi

echo "Building SDK..."

cd sdk/packages

cd gimhook

if [ ! -d node_modules ]
then
	npm i
fi

npm run build

cd ..

cd create-gimhook

if [ ! -d node_modules ]
then
	npm i
fi

npm run build

cd ..

cd ../..