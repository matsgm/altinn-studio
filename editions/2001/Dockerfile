FROM altinntjenestercontainerregistry.azurecr.io/altinn-runtime:124 AS stage

#dotnet:2.1-sdk
FROM microsoft/dotnet@sha256:c50b596c93b11167ef7c6174a2717a18382d28965c11984691a0479c990ada3d AS build
WORKDIR /app
COPY --from=stage /app/AltinnCore.ServiceLibrary.dll .
WORKDIR /AltinnService/
COPY --from=stage /AltinnService .
COPY Implementation/*.cs ./
COPY Model/*.cs ./
RUN dotnet publish -o publish/

FROM microsoft/dotnet:2.1-aspnetcore-runtime AS final
WORKDIR /app
COPY --from=build /app .
WORKDIR /AltinnService/
COPY --from=build /AltinnService/publish/ .
COPY Metadata .
COPY Model .
COPY Views .
COPY config.json .
COPY Implementation .
COPY Resources .
ENTRYPOINT ["dotnet", "AltinnCore.Runtime.dll"]
