# Restless

Websocket layer on top of http endpoints.  Every namespace serves as a socket with two actions: subscribe, and update.  When data is posted to the relevant REST endpoint, the update action is called upon from the posting service.  All clients subscribed to the socket are then pushed the updated dataset via the susbcribe action.

## File structure
    .
    ├── sockets                 # All sockets, grouped by application
    ...                   
    ├── server.js               # Entry point, Express config
    ...
    └── README.md

## Running Locally

### Prerequisites

* [Node.js](https://nodejs.org) - JS runtime
* .env - See .env.example for all required secrets

### Installation
```
git clone https://github.com/CityofPittsburgh/restless
cd restless
npm install
node server.js
```

## Deployment

Both staging and production services are hosted in Azure.  Application is deployed directly from github, and can be triggered either (a) through the Azure GUI, (b) through the [CLI](https://docs.microsoft.com/en-us/cli/azure/webapp/deployment/source?view=azure-cli-latest#az-webapp-deployment-source-sync), or (c) through the [proxy service](https://github.com/CityofPittsburgh/azure-proxy).

For complete documentation on the azure environment, see [here](https://github.com/CityofPittsburgh/all-things-azure.git).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details