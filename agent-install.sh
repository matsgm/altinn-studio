#!/bin/bash

mkdir myagent
cd myagent
wget https://vstsagentpackage.azureedge.net/agent/2.140.2/vsts-agent-linux-x64-2.140.2.tar.gz
tar zxvf vsts-agent-linux-x64-2.140.2.tar.gz

./config.sh --unattended \
--url $AZURE_DEVOPS_URL \
--auth pat \
--token $AZURE_DEVOPS_TOKEN \
--pool $AZURE_AGENT_HOST_POOL \
--agent $AZURE_AGENT \
–acceptTeeEula