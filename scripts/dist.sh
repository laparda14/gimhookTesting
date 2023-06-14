#!/bin/sh

# If we can find ourself, this script was run within the scripts directory.
# And if that's the case, we need to go to the parent directory for this to work properly.

if [ -f dist.sh ]
then
	cd ..
fi

echo "Building modloader..."

cd modloader

if [ ! -d node_modules ]
then
	npm i
fi

npm run dist

cd ..

echo "Building desktop app..."

cd ui

if [ ! -d node_modules ]
then
	npm i
fi

npm run dist

cd ..

cd desktop

if [ ! -d node_modules ]
then
	npm i
fi

npm run dist

cd dist

tar -czvf gimhook-linux-x64.tar.gz gimhook-linux-x64
zip -r gimhook-win32-x64 gimhook-win32-x64

cd ../..