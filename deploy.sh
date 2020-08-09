#!/bin/bash

set -euo pipefail
cd "$(dirname "$0")"

while [[ $# -gt 0 ]]; do
  case $1 in
    # --help)
    #   show_help
    #   exit
    # ;;
    --env)
      shift
      env="$1"
    ;;
    --version)
      shift
      version="$1"
    ;;
  esac
  shift
done

# NOTE: currently we have 1 cluster named eks-dev, later when we have more environments we need to change this
# login to EKS cluster
aws eks --region ap-southeast-1 update-kubeconfig --name "eks-dev" --alias "eks-dev"

project="$(node -p "require('./package.json').name")"

cd helm

# package and deploy using helm
helm package "./${project}" "--version=${version}"
helm upgrade -f "./${project}/${env}-values.yaml" "${project}" "${project}-${version}.tgz" \
     --install \
     --set "namespace=web-${env}" \
     --wait \
     --namespace "web-${env}" \
     --debug
