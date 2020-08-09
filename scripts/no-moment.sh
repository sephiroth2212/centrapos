#!/bin/bash

found_moment=$(grep moment yarn.lock)

if grep moment yarn.lock > /dev/null; then
  >&2 echo fail: moment found in yarn.lock
  >&2 echo prefer date-fns to moment
  >&2 echo https://www.notion.so/centrapay/Moment-and-Date-Time-Libraries-ccb5cc7c19194f3db8407e70aed1b041
  exit 1
fi

exit 0
