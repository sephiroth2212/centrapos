#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")/.."

docker-compose \
  -f docker-compose.yml \
  run cypress sh -c "
    yarn cypress install &&
    yarn wait-on tcp:app:8080 &&
    yarn cypress run -b chrome --headless
  " || failed=yes

docker-compose logs --no-color > docker-compose.log

[[ -z "${failed:-}" ]] || exit 1
