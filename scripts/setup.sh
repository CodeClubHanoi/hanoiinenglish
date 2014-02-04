#!/bin/bash

BOWER_COMPONENTS='bower_components'
APP_LIB='app/lib'
FOUNDATION=$APP_LIB/foundation/
JQUERY=$APP_LIB/jquery/
MODERNIZR=$APP_LIB/modernizr/

mkdir $FOUNDATION
cp $BOWER_COMPONENTS/foundation/js/foundation.min.js $FOUNDATION

mkdir $JQUERY
cp $BOWER_COMPONENTS/jquery/jquery.min.js $JQUERY

mkdir $MODERNIZR
cp $BOWER_COMPONENTS/modernizr/modernizr.js $MODERNIZR
