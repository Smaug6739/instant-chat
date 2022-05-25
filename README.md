# Instant chat

This project is an instant chat with a member area, using socket.io, vuejs and typescript.

## Infos

![demo](https://cdn.discordapp.com/attachments/848993640231731200/848993708208816168/unknown.png)

### Backend

- Expressjs version 4
- Socket.io version 5
- Authentification: Json Web Token

### Frontend

- Vuejs version 3
- Socket.io-client version 4

## How to install

1. Clone the repo

### Backend

1. Clone config.template.ts into the `backend/src` directory and rename it to config.ts
2. In `backend` directory install the dependencies: `npm install`
3. Compile typescript : `tsc`
4. Start the server : `npm run start`

### Frontend

1. Clone config.template.js into the `frontend` directory and rename it to config.js
2. In `frontend` directory install the dependencies: `npm install`
3. Compile scss `npm run sass`
4. Start the developement server with `npm run serve` or create a production build with `npm run build` and start with `serve dist`

## Contributions/Licence

This project is still in development and has an MIT license.
If you wish, you are welcome to contribute.
