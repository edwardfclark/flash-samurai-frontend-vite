# Flash Samurai Frontend

This is the new frontend for the Flash Samurai project, configured to use Vite instead of Create React App.

Flash Samurai is an application for creating and maintaining decks of flash cards, and also allows a user to perform a Quiz using stored cards.

The original (now deprecated) frontend for this project can be found at [flash-samurai-frontend-cra](https://github.com/edwardfclark/flash-samurai-frontend-cra).

## Setup

1. Make sure `flash-samurai-backend` is running. You can find the repo for the backend [here](https://github.com/edwardfclark/flash-samurai-backend). MongoDB must be installed in order to run the backend.
2. Create a `.env` file and point the `VITE_API_URL` value at the API's URL, e.g. `VITE_API_URL="http://localhost:3001"`.
3. `yarn dev`
