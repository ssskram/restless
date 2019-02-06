# Restless

Real-time middleware for REST endpoints

## Authorization

Bearer token.  Just ask for it

## Gist

Websocket layer on top of http endpoints.  Every namespace serves as a socket with two actions: subscribe, and update.  When data is posted to the relevant REST endpoint, the update action is called upon from the posting service.  All clients subscribed to the socket are then pushed the updated dataset via the susbcribe action.
