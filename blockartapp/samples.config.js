/*
Diese Datei beinhaltet die Konfiguration für den Authentifizierungsdienst Okta
 */
 
export default {
  oidc: {
    clientId: '0oa11l7czJyLZqqHf4x6',
    redirectUri: 'com.okta.dev-665917:/callback',
    endSessionRedirectUri: 'com.okta.dev-665917:/callback',
    discoveryUri: 'https://dev-665917.okta.com/oauth2/default',
    scopes: ['openid', 'profile', 'offline_access'],
    requireHardwareBackedKeyStore: false,
  }
};