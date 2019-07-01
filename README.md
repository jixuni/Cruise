# Cruise

![ScreenShot](https://github.com/jixuni/Cruise/blob/master/images/ScreenShot.png)

[Demo video of app](https://www.youtube.com/watch?v=BGp6jQ3oZWw&feature=youtu.be)

Cruise is an mobile ride sharing app build with Read Native. It allows the driver to look for passengers in
real time or passengers to request a ride.



## Getting Started

For a portion of the app it uses google maps to render the map. This require quite a bit of configuration to set up(Only for IOS), android will not have this problem the default map uses google maps. To use google maps as default for ios platform look at documents here \* [React-Native-Maps](https://github.com/react-native-community/react-native-maps). The pod file listed on react-native maps page requires alot of dependecies. The one listed in this this project ios/Podfile is minify.

### Prerequisites

```
Xcode is require for ios testing

Cocoapods installing and managing the depencies for swift/Objective-C apps

node server back-end

mongo-db database
```

### Installing

Clone repo

```
cd cruise/ios

pod install ( install pod congifuration, recommend reading the https://github.com/react-native-community/react-native-maps for more indept guide and trouble shoot

npm install or yarn install (App directory)
cd express-backend  npm install or yarn install
cd socket.io-backend npm install or yarn install
```

```
The api files in .gitnore at home directory needs to be create (mongodb, jwt, googleapi)
```

## Running the tests

For running the app on ios simulator use the command.

```
react-native run-ios --simulator "iPhone 6" .
react-native run-ios --simulator "iPhone SE"
```

There is performance issue running the ios sim with a newer iPhone simulation model e.g iPhone X.

## Deployment

The database is currently hosted through MongoDB Atlas. The express-server and socket.io are both hosted on heroku.

## Built With

- [node](https://nodejs.org/en/) - Node.js for back-end
- [MongoDB-Atlas](https://www.mongodb.com/cloud/atlas) - Database
- [Cocoapods](https://cocoapods.org/) - Dependecies manager for xcode and Objective-C projects
- [socket.io](https://socket.io/) - real time communication
- [react-native](https://facebook.github.io/react-native/) - Use to build native ios/android apps
- [react-native-maps](https://github.com/react-native-community/react-native-maps) React Native Mapview component for iOS + Android
- [express-js](https://expressjs.com/) backend server
- [Mongoosejs](https://mongoosejs.com/) database model for MongoDb
- Jsonwebtoken for authentication
- bcrypt for hashing password




