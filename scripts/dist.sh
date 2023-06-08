#!/bin/sh

echo "Building modloader..."

cd modloader

if [ ! -d node_modules ]
then
	npm i
fi

npm run dist

cd ..

echo "Building desktop app..."

cd desktop

if [ ! -d node_modules ]
then
	npm i
fi

npm run dist

cd ..