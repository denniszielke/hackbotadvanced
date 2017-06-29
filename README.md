---
services: bots
platforms: nodejs
author: denniszielke
---

# Advanced bot on azure with NodeJs
This sample shows you how to deploy a simple bot hosted on Azure Websites. 

![Advanced Bot Hackathon](./images/architecture.png)

For a complete end-to-end walk-through of creating this application, please refer to the [Bot Builder SDK for Node.js](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-overview)

## Running this sample
1. Deploy the arm template in arm/template.json to azure

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fdenniszielke%2Fhackbotsimple%2Fmaster%2Farm%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png"/>
</a>  

It will deploy the following resources
- Azure Web App
- Application Insights
- Azure Search
- Cosmos DB
- LUIS
- Azure Function
- Code from github to the WebApp
- Configuration from all resource to environment variables in the web app and function

