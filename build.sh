#!/bin/sh

DIST_PATH=./dist

rm -rf $DIST_PATH/*
mkdir -p $DIST_PATH
zip -r $DIST_PATH/package.zip src
