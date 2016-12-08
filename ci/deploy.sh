#!/bin/bash
echo "Deploying"
set -x
if [ $TRAVIS_BRANCH == 'at' ] ; then
    git init

    git remote add staging "ssh://deploy@139.59.36.122:/var/www/at.labs.appiume.com/site.git"
    git config user.name "Linh Le"
    git config user.email "dev.linhlv@gmail.com"
    
    git add .
    git commit -m "Deploy"    
    git push staging master
else
    echo "Not deploying, since this branch isn't master."
fi