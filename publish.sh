#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")/kete-server"

version="$1"
project="$(node -p "require('../package.json').name")"
image_name="centrapay/${project}"
ecr_registry=514963023142.dkr.ecr.ap-southeast-1.amazonaws.com
image_fqn="${ecr_registry}/${image_name}:${version}"
image_fqn_latest="${ecr_registry}/${image_name}:latest"
TIMESTAMP="$(date)" && export TIMESTAMP
./env-handlebars < ./src/version.js.handlebars | tee ./src/version.js

cd ../

# build frontend to take advantage of yarn cache
yarn build
docker build \
  -t "${image_fqn}" \
  .

docker tag "${image_fqn}" "${image_fqn_latest}"

aws --region ap-southeast-1 ecr get-login-password \
  | docker login \
    --password-stdin \
    --username AWS \
    "${ecr_registry}"

docker push "${image_fqn}"
docker push "${image_fqn_latest}"
