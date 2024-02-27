// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44326/api',
  defaultPassword: 'P@ssword1',
  googleApiKey: '',
  firebase: {
    databaseURL: 'https://geeks4learning-1ef1e-default-rtdb.firebaseio.com/',
    locationId: 'us-central',
    apiKey: 'AIzaSyCmnSa1MP3SS3MLCwfMd9VUBYnFVUjhpEI',
    authDomain: 'geeks4learning-1ef1e.firebaseapp.com',
    projectId: 'geeks4learning-1ef1e',
    storageBucket: 'geeks4learning-1ef1e.appspot.com',
    messagingSenderId: '927244532147',
    appId: '1:927244532147:web:d8525c929e24ce264ab3c6',
    measurementId: 'G-6YRRYK2SKQ',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
