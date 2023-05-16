# Plein Air Capstone Project

Plein Air Capstone Project is an app that allows users to digitize their artistic studies, organize them, and view their plein air studies on a map associated with the real world locations where said study was drawn/painted. My hope is that the project can function as a sort of virtual sketchbook that might encourage artist's to hone their skills through getting out into the world and drawing or painting whatever they see. The app is currently not deployed anywhere, but I would love for it to someday also allow users to connect with each other in a more social media-like capacity.

## Installation

To run the app locally, fork and clone this repo. Then from within the project directory, run:

```bash
bundle install
npm install --prefix client
```
to install the ruby gems and npm packages. Next, run:
```bash
rails db:migrate
```
to run the migrations to set up the database.
To get the map up and running, you will also need your own API key from the Google Maps API. [This documentation](https://developers.google.com/maps/documentation/javascript/get-api-key) will walk you through getting an API key. Once you have the key, create a .env.local file in the app's client directory. In the .env.local file, add:

REACT_APP_PLEIN_AIR_MAP_GOOGLE_MAPS_API_KEY= "your API key"

This way the PleinAirMap component will be able to load the map you created in the Google Maps API console.

## Usage
To run the app, open a new window in your terminal and enter:
```
rails s
```
to start the backend rails server.
Then, open another window and enter:
```
npm start --prefix client
```
to run the react frontend in your default browser. Now you can create an account, login, edit your studies or post new ones from the map using location data or from the homepage if there is no location data involved. Have fun!
## Contributing
Feel free to play around with stuff in your own forked version if you like. Since this is a school project (and one I hope to continue developing myself!), I probably won't be able to accept contributions to the main branch.

## Credits
The frontend for the app is built using [React](https://reactjs.org/) with a [Rails](https://rubyonrails.org/) backend.
Adding image attachments was made possible through [Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html). For the map display and location data, I used the [Google Maps JavaScript API](https://developers.google.com/maps) and the [react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) library to handle the map and location based features of the app.
This project was done for my Phase 5 Capstone Project for Flatiron School's Software Engineering flex bootcamp. Thank you so much to everyone at Flatiron for seeing me through to the end of the program, I hope this project can show just how far I've come in my programming journey!