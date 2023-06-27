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

if [ -d Gimhook-darwin-x64 ]
then
	cd Gimhook-darwin-x64
	zip -r ../gimhook-darwin-x64.zip Gimhook.app
	cd ..
fi

if [ -d Gimhook-darwin-arm64 ]
then
	cd Gimhook-darwin-arm64
	zip -r ../gimhook-darwin-arm64.zip Gimhook.app
	cd ..
fi

if [ -d gimhook-linux-x64 ]
then
	tar -czvf gimhook-linux-x64.tar.gz gimhook-linux-x64
fi

if [ -d gimhook-win32-x64 ]
then
	zip -r gimhook-win32-x64.zip gimhook-win32-x64
fi

cd ../..