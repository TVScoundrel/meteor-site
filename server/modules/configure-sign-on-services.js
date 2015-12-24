let createServiceConfiguration = (service, clientId, secret) => {
  var config;
  switch (service) {
    case 'facebook':
      config = {
        appId: clientId,
        loginStyle: "popup",
        secret: secret
      }
      break;
    case 'twitter':
      config = {
        consumerKey: clientId,
        loginStyle: "popup",
        secret: secret
      }
      break;
    default:
      config = {
        clientId: clientId,
        loginStyle: "popup",
        secret: secret
      }
  }
  
  ServiceConfiguration.configurations.upsert(
    { service: service },
    {
      $set: config
    }
  );
}

let configureSignOnServices = () => {
  createServiceConfiguration("google", "417598993854-riiiaeue653jphqse3l575dfjanmuavo.apps.googleusercontent.com", "acbE-MB9331AEI9jeZvw_lt_");
  createServiceConfiguration("facebook", "1673065749617460", "6f43bc2441a1450a9c875ba95da48e99");
  createServiceConfiguration("github", "5777433291fdbd48c28a", "5c1860bde1d94157bbaee1ae7aa44106bd887f5e");
  createServiceConfiguration("twitter", "cSgCIdcP0vjITieY6C6DC9ww7", "jSWb3QGiB8Fa9POb9VjZa3Uu0glGoq1wHCTzDGLlBh9G98uRbS");
}

Modules.server.configureSignOnServices = configureSignOnServices;