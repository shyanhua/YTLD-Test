# pre-requisite

- environment setup
  https://reactnative.dev/docs/set-up-your-environment

# steps to run the project

1. npm install
2. cd ios && pod install && cd ..
3. cd android && ./gradlew build && cd ..
4. npm start

# enhancement

- pagination
- test case with jest framework

# tips

- to simulate to a closer real app, this app is calling the api from free.beeceptor.com, it only allow 50 requests/day
- if happen to remove node_modules and npm to re-install , please modify this for android https://github.com/wix/react-native-navigation/issues/7881#issuecomment-2164213896
