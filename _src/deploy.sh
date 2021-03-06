#!/bin/bash

echo -e "\033[0;32mDeploying updates to Github...\033[0m"

# Build the project.
hugo

git add -A :/

# Commit changes.
msg="Fix GA `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
# git subtree push --prefix=public git@github.com:spencerlyon2/hugo_gh_blog.git gh-pages
