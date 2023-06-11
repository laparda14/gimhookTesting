#!/bin/sh

# If we can find ourself, this script was run within the scripts directory.
# And if that's the case, we need to go to the parent directory for this to work properly.

if [ -f build.sh ]
then
	cd ..
fi

echo "Building modloader..."

cd modloader

if [ ! -d node_modules ]
then
	npm i
fi

npm run build

cd ..

echo "Building desktop app..."

cd desktop

if [ ! -d node_modules ]
then
	npm i
fi

npm run build

cd ..