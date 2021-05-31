// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  sso_api_username: '21irncoemoqjahoa6os92c35rn',
  sso_api_pwd: 'dbj8qvbinp8t557obj83r4r8nvfej8bs30iiv4elkvec4htngek',

  loginURL: 'https://fit5225-demo-tueauth.us-east-1.amazoncognito.com/login?' +
              'client_id=21irncoemoqjahoa6os92c35rn&response_type=code&scope=openid+profile&' +
              'redirect_uri=http://localhost:4200/callback',

  redirectURL: 'http://localhost:4200/callback',

  cognitoTokenURL: 'https://fit5225-demo-tue.auth.us-east-1.amazoncognito.com/oauth2/token',

  logout: 'https://fit5225-demo-tue.auth.us-east-1.amazoncognito.com/logout?' +
          'client_id=21irncoemoqjahoa6os92c35rn&' +
          'logout_uri=http://localhost:4200/home'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
