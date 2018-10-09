#!/bin/bash
################################################################################
##  File:  dotnetcore-sdk.sh
##  Team:  CI-Platform
##  Desc:  Installs .NET Core SDK
################################################################################

source $HELPER_SCRIPTS/apt.sh
source $HELPER_SCRIPTS/document.sh

LATEST_DOTNET_PACKAGE=dotnet-sdk-2.1

LSB_RELEASE=$(lsb_release -rs)

echo "Determing if .NET Core ($LATEST_DOTNET_PACKAGE) is installed"
if ! IsInstalled $LATEST_DOTNET_PACKAGE; then
    echo "Could not find .NET Core ($LATEST_DOTNET_PACKAGE), installing..."
    apt-get install $LATEST_DOTNET_PACKAGE -y
    DocumentInstalledItem ".NET Core SDK $LATEST_DOTNET_PACKAGE"
else
    echo ".NET Core ($LATEST_DOTNET_PACKAGE) is already installed"
fi

release_url="https://raw.githubusercontent.com/dotnet/core/master/release-notes/releases.json"
sdks=$(curl $release_url | grep version-sdk | grep -v preview | grep -v rc | grep -v display | cut -d\" -f4)
for sdk in $sdks; do
    # Glob matches dotnet-dev-1.x or dotnet-sdk-2.y
    if apt-get install -y --no-install-recommends "dotnet-*-$sdk"; then
        DocumentInstalledItem ".NET Core SDK $sdk"
        mkdir "$sdk"
        cd "$sdk" || exit
        set -e
        echo "{\"sdk\": { \"version\": \"$sdk\" }}" > global.json
        dotnet new console
        set +e
        cd .. || exit
        rm -rf "$sdk"
    fi
done
