FROM altinntjenestercontainerregistry.azurecr.io/runtime:15 AS build
WORKDIR /AltinnService/
COPY /AltinnService .
COPY Implementation/*.cs ./
COPY Model/*.cs ./
RUN dotnet build

FROM microsoft/dotnet:2.1-aspnetcore-runtime AS final
WORKDIR /app
COPY --from=build /app .
WORKDIR /AltinnService/
COPY --from=build /AltinnService/bin/Debug/netcoreapp2.1/AltinnService.dll .
COPY Metadata .
COPY Model .
COPY Views .
COPY config.json .
COPY Implementation .
COPY Resources .
ENTRYPOINT ["dotnet", "AltinnCore.Runtime.dll"]