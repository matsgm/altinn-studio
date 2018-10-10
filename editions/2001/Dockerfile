FROM altinntjenestercontainerregistry.azurecr.io/altinn-runtime:83 AS build
WORKDIR /AltinnService/
COPY /AltinnService .
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
