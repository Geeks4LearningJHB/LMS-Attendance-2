export interface AppConfig {
  production: boolean;
  apiUrl: string;
  defaultPassword: string;
  // googleApiKey?: string;
  firebase: {
    projectId: string;
    appId: string;
    databaseURL: string;
    storageBucket: string;
    locationId: string;
    apiKey: string;
    authDomain: string;
    messagingSenderId: string;
    measurementId: string;
  };
}
