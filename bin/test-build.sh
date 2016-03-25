#!/usr/bin/env bash

# This script is inspired from my previous project topheman/vanilla-es6-jspm
#
# https://github.com/topheman/vanilla-es6-jspm/blob/master/bin/test-build.sh
#
# This script will launch the `npm run build` task (based on the env vars)
#
# If your build/ folder is under git management,
# it will git stash your modifications before doing anything and restore them
# at the end of the test (wether it passed or not)

# don't put this flag, we need to go through
# always stop on errors
# set -e

echo "This script is deprecated - I maybe upgrade it in the future."
exit 1

WEBPACK_PATH="$(npm bin)/webpack"

BUILD_IS_GIT=0
BUILD_IS_GIT_DIRTY=0

# vars retrieving the exit codes of the commands run
NPM_RUN_BUILD_EXIT_CODE=0
WEBPACK_CLEAN_EXIT_CODE=0

echo "###### TEST npm run build"

# If build folder is under git, stash modification - fail if can't stash
if [ -d $(dirname $0)/../build/.git ]
then
  BUILD_IS_GIT=1
  echo "[INFO] build folder is under git management"
  cd $(dirname $0)/../build
  echo "[INFO] $(pwd)"

  if [[ -n $(git status --porcelain) ]]
  then
    BUILD_IS_GIT_DIRTY=1
    echo "[INFO] build folder has un-committed changes, stashing them"

    cmd="git stash save -u"
    echo "[RUN] $cmd"
    eval $cmd
    if [ $? -gt 0 ]
    then
      echo "[WARN] Couldn't stash modifications please commit your files in build folder before proceeding"
      exit 1
    fi
  else
    echo "[INFO] build folder repo is clean, nothing to stash"
  fi
fi

cmd="npm run build"
echo "[RUN] $cmd"
eval $cmd
NPM_RUN_BUILD_EXIT_CODE=$?
echo "[DEBUG] npm run build exit code : $NPM_RUN_BUILD_EXIT_CODE";

cmd="npm run clean"
echo "[RUN] $cmd"
eval $cmd
WEBPACK_CLEAN_EXIT_CODE=$?
echo "[DEBUG] npm run clean exit code : $WEBPACK_CLEAN_EXIT_CODE";

if [ $WEBPACK_CLEAN_EXIT_CODE -gt 0 ] && [ $BUILD_IS_GIT_DIRTY -gt 0 ]
then
  echo "[WARN] Couldn't clean the build folder repo before git unstash"
  echo "[WARN] Run the following commands manually to get back your repo in build folder"
  echo "[INFO] ./node_modules/.bin/webpack --clean-only"
  echo "[INFO] git reset --hard HEAD"
  echo "[INFO] git stash pop --index"
  exit 1
fi

# After cleaning build folder, if it is a git repo, point it back to the HEAD
if [ $BUILD_IS_GIT -gt 0 ]
then
  echo "[INFO] build folder is under git management, pointing back to HEAD"

  cmd="git reset --hard HEAD"
  echo "[RUN] $cmd"
  eval $cmd
  if [ $? -gt 0 ]
  then
    echo "[WARN] Couldn't reset --hard HEAD build folder repo"
    echo "[WARN] Run the following command manually to get back your repo in build folder"
    echo "[INFO] git reset --hard HEAD"
    echo "[INFO] git stash pop --index"
    exit 1
  fi
fi

# If build folder is a git repo and was dirty, retrieve the stash
if [ $BUILD_IS_GIT_DIRTY -gt 0 ]
then
  echo "[INFO] build folder is under git management & has stashed files, retrieving stash"

  cmd="git stash pop --index"
  echo "[RUN] $cmd"
  eval $cmd
  if [ $? -gt 0 ]
  then
    echo "[WARN] Couldn't unstash build folder repo"
    echo "[WARN] Run the following command manually to get back your repo in build folder"
    echo "[INFO] git stash pop --index"
    exit 1
  fi
else
  if [ $BUILD_IS_GIT -gt 0 ]
  then
    echo "[INFO] build folder is under git management but directory was clean at start, nothing to unstash"
  fi
fi

#finally return an exit code according to the npm run build task
if [ $NPM_RUN_BUILD_EXIT_CODE -gt 0 ]
then
  echo "[FAILED] npm run build failed. Exiting with code $NPM_RUN_BUILD_EXIT_CODE"
  echo "###### END TEST npm run build"
  exit $NPM_RUN_BUILD_EXIT_CODE
else
  echo "[PASSED] npm run build passed"
  echo "###### END TEST npm run build"
  exit 0
fi
