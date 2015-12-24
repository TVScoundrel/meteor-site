let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _configureSignOnServices();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {};

var _generateAccounts = () => Modules.server.createUsers();

var _configureSignOnServices = () => Modules.server.configureSignOnServices();

Modules.server.startup = startup;
