FROM altinntjenestercontainerregistry.azurecr.io/runtime:15 AS build
WORKDIR /AltinnService/
COPY /AltinnService .
#RUN dotnet new classlib
#RUN rm -rf *.cs
COPY Implementation/*.cs ./
COPY Model/*.cs ./
#RUN dotnet restore
RUN dotnet build
#WORKDIR /app/bin/Debug/netstandard2.0
#RUN dotnet /usr/share/dotnet/sdk/2.1.402/Roslyn/csc.exe -r:/usr/share/dotnet/shared/Microsoft.NETCore.App/2.1.402/System.Private.CoreLib.dll -r:/usr/share/dotnet/shared/Microsoft.NETCore.App/2.1.402/System.Console.dll -r:/usr/share/dotnet/shared/Microsoft.NETCore.App/2.1.402/System.Runtime.dll helloworld.cs
#ENTRYPOINT [ "dotnet", "app.dll" ]

FROM microsoft/dotnet:2.1-aspnetcore-runtime AS final
WORKDIR /AltinnService/
COPY --from=build /AltinnService/bin/Debug/netcoreapp2.1/AltinnService.dll .
COPY Implementation .
COPY Metadata .
COPY Model .
COPY Resources .
COPY Views .
COPY config.json .
WORKDIR /app
COPY --from=build /app .
RUN ls
ENTRYPOINT ["dotnet", "AltinnCore.Runtime.dll"]