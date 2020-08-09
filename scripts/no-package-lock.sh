#!/bin/bash

if [[ -f package-lock.json ]]; then
  >&2 echo npm lock file found
  exit 1
fi

exit 0
