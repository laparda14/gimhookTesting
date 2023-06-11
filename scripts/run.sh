#!/bin/sh

# If we can find ourself, this script was run within the scripts directory.
# And if that's the case, we need to go to the parent directory for this to work properly.

if [ -f run.sh ]
then
	cd ..
fi

cd desktop

npx electron . $@

cd ..