# Tracker
## A Tracker app using react native with context API and react navigation and custom express API using ngrok and jsonServer with authentication using JWT, async storage and bcrypt where each user can see their location on map and choose to store it using mongoDB for data persistence

### To view the application locally we need either physical device or we can use an emulator

#### For physical device

1. Install the expo app on your physical device

#### For emulator

HyperV should be enabled on your computer in the BIOS.

1. Install android studio on your computer
3. Create a virtual device and then press on run.

#### To run the application

1. First install all required dependencies in both main folder and in track-server
```
npm i 
```
2. Then run your emulator or the expo app on your physical device

3. Then install ngrok from web and set path of ngrok.exe in your Path environment variable

4. Then navigate over to track-server folder and run the command
```
npm run dev
```

5. If previous step fails see if your IP is whitelisted on mongoDB website and check your URI link.

6. Then in another terminal run
```
ngrok http 3000
```

7. Then copy the forwarding link from previous step and paste it into the baseURL field in tracker.js inside the src folder inside src.

8. Then run inside main folder
```
npm start
```

#### Here we use _mockLocation.js which sends fake location to our emulator to test out our application so that we can see changes in our location. To prevent buggy tests update the latitude and longitude to your respective actual latitude and longitude in both _mockLocation.js and Map.js. Further if we dont want to use fake locations we need to remove our "import '../_mockLocation'" statement and also the location.mocked!=false condition in location context.

