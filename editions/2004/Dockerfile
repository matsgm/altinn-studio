FROM altinntjenestercontainerregistry.azurecr.io/altinn-runtime:306 AS stage

#dotnet:2.1-sdk
#FROM microsoft/dotnet@sha256:c50b596c93b11167ef7c6174a2717a18382d28965c11984691a0479c990ada3d AS build

#temp altinn-runtime with sdk
FROM altinntjenestercontainerregistry.azurecr.io/altinn-runtime:50 AS build

WORKDIR /app
COPY --from=stage /app/AltinnCore.ServiceLibrary.dll .
WORKDIR /AltinnService/
COPY --from=stage /AltinnService .
COPY Implementation/*.cs ./
COPY Model/*.cs ./
RUN dotnet publish -o publish/

FROM microsoft/dotnet:2.1-aspnetcore-runtime AS final
WORKDIR /app

#copy altinn-runtime app
COPY --from=stage /app .

#copy service
WORKDIR /AltinnService/bin/
COPY --from=build /AltinnService/publish/AltinnService* ./
WORKDIR /AltinnService/
COPY Metadata/ Model/ Views/ ./
COPY Implementation/ Resources/ ./
COPY config.json .
RUN ls

#entrypoint
ENTRYPOINT ["dotnet", "AltinnCore.Runtime.dll"]
