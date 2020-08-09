#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")/.."

project="$(node -p "require('./package.json').name")"

function validate() {
  env="$1"
  echo
  echo "Helm Lint: ${env}"
  helm lint "helm/${project}" -f "helm/${project}/${env}-values.yaml"
  echo
  echo "Kube Validate: ${env}"
  helm template "helm/${project}" -f "helm/${project}/${env}-values.yaml" | kubeval
}

validate dev
validate prod
