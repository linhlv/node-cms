#!/bin/bash
echo "Deploying"
set -x
if [ $TRAVIS_BRANCH == 'staging' ] ; then    
    git config --global user.email "dev.linhlv@gmail.com"
    git config --global user.name "Linh Le"    
    git init 
    git add .
    git commit -m "Deploy"
    git remote add staging "ssh://deploy@139.59.36.122:/var/www/at.labs.appiume.com/site.git"
    git push -f staging master
else
    echo "Not deploying, since this branch isn't staging."
fi