# Restless

Real-time middleware for REST endpoints

## Authorization

Bearer token.  Just ask for it

## Gist

Every endpoint serves as a websocket with two actions: subscribe, and update.  When data is posted to the relevant REST endpoint, the update action is called upon from the posting service.  All clients subscribed to the socket are then pushed the updated dataset via the susbcribe action.

Er, that's the intention.  I haven't actually made it yet...

## Docs

Swagger UI:

https://restless.azurewebsites.us/docs

# restless
