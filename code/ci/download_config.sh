#!/bin/bash
echo "Downloading config"
set -x
if [ $TRAVIS_BRANCH == 'staging' ] ; then    
    scp deploy@139.59.36.122:/var/configs/at.labs.appiume.com/config.staging.js config.js
else
    echo "Not deploying, since this branch isn't staging."
fi