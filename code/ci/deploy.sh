#!/bin/bash
echo "Deploying"
set -x
if [ $TRAVIS_BRANCH == 'at' ] ; then    
    git remote add staging "ssh://deploy@139.59.36.122:/var/www/at.labs.appiume.com/site.git" 
    git push staging master
else
    echo "Not deploying, since this branch isn't master."
fi