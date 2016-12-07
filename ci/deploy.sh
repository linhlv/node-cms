#!/bin/bash
echo "Deploying"
set -x
if [ $TRAVIS_BRANCH == 'at' ] ; then
    # Initialize a new git repo in _site, and push it to our server.
    #cd _site
    git init
        
    git remote add deploy "deploy@139.59.36.122:/var/www/at.labs.appiume.com"
    git config user.name "Linh Le"
    git config user.email "dev.linhlv@gmail.com"
    
    git add .
    git commit -m "Deploy"
    #git push --force deploy master
    git push --set-upstream deploy master
else
    echo "Not deploying, since this branch isn't master."
fi