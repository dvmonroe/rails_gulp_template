#!/bin/bash

NEW_SHA=$1
RAILS_ENV=$2

mkdir -p precompile

cd precompile
git clone .. . || git fetch
git checkout $NEW_SHA

cd frontend
cp -r ../path/to/frontend/dependencies .

export RAILS_ENV=$RAILS_ENV
gulp install
gulp default
gulp production
gulp publish