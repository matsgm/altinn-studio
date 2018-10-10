#!/bin/bash
################################################################################
##  File:  containercache.sh
##  Team:  CI-Platform
##  Desc:  Prepulls Docker images used in build tasks and templates
################################################################################

source $HELPER_SCRIPTS/apt.sh
source $HELPER_SCRIPTS/document.sh

# Check prereqs
echo "Checking prereqs for image pulls"
if ! command -v docker; then
    echo "Docker is not installed, cant pull images"
    exit 1
fi

# Information output
systemctl status docker --no-pager

# Pull images
#for image in jekyll/builder; do
#    docker pull $image
#done

#dotnet:2.1-sdk
docker pull microsoft/dotnet@sha256:c50b596c93b11167ef7c6174a2717a18382d28965c11984691a0479c990ada3d
#dotnet:2.1-aspnetcore-runtime
docker pull microsoft/dotnet@sha256:b99ecca89d5a1d8919782f01b639d2376267456f6b7b5cc1b9d7fca94f579869

#login to altinntjenestercontainerregistry
docker login $ACR_URL -u $ACR_NAME -p $ACR_PASSWORD
#altinn-runtime
docker pull altinntjenestercontainerregistry.azurecr.io/altinn-runtime:83

## Add container information to the metadata file
echo ""
DocumentInstalledItem "Cached container images"

while read -r line; do
    DocumentInstalledItemIndent "$line"
done <<< "$(docker images | tail -n +2 | cut -d' ' -f 1)"
