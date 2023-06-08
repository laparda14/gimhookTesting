#!/bin/sh

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