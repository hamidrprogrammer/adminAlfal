// src/msalConfig.js

const msalConfig = {
    auth: {
        clientId: '356fe2ef-4e6c-4719-bfa5-1b2996c41fcd', // Application (client) ID
        authority: 'https://login.microsoftonline.com/d9f018ac-3fe4-43ee-b3ff-fdafdec35d3f', // Replace {tenantId} with your actual tenant ID
        redirectUri: 'https://admin.bu-fos-mastermind.solutions-apps.com/api/auth/callback/azure-ad', // Redirect URI
    },
    cache: {
        cacheLocation: 'localStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set to true for IE 11
    }
};

export default msalConfig;
