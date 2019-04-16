var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClientFactory = require('../Auth0RestClientFactory');

/**
 * @class ClientsManager
 * Auth0 Clients Manager.
 *
 * {@link https://auth0.com/docs/api/v2#!/Clients Clients} represent
 * applications.
 * You can learn more about this in the
 * {@link https://auth0.com/docs/applications Applications} section of the
 * documentation.
 * @constructor
 * @memberOf module:management
 *
 * @param {Function} restClientCreator Factory method to create rest client
 */
var ClientsManager = function(restClientCreator) {
  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' }
  };

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Clients Auth0 Clients endpoint}.
   *
   * @type {external:RestClient}
   */
  this.resource = restClientCreator('/clients/:client_id', clientOptions);
};

/**
 * Create an Auth0 client.
 *
 * @method    create
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * management.clients.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client created.
 * });
 *
 * @param   {Object}    data     The client data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'create', 'resource.create');

/**
 * Get all Auth0 clients.
 *
 * @method    getAll
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example <caption>
 *   This method takes an optional object as first argument that may be used to
 *   specify pagination settings. If pagination options are not present,
 *   the first page of a limited number of results will be returned.
 * </caption>
 *
 * // Pagination settings.
 * var params = {
 *   per_page: 10,
 *   page: 0
 * };
 *
 * management.clients.getAll(params, function (err, clients) {
 *   console.log(clients.length);
 * });
 *
 * @param   {Object}    [params]          Clients parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 client.
 *
 * @method    get
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * management.clients.get({ client_id: CLIENT_ID }, function (err, client) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(client);
 * });
 *
 * @param   {Object}    params            Client parameters.
 * @param   {String}    params.client_id  Application client ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'get', 'resource.get');

/**
 * Update an Auth0 client.
 *
 * @method    update
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * var data = { name: 'newClientName' };
 * var params = { client_id: CLIENT_ID };
 *
 * management.clients.update(params, data, function (err, client) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(client.name);  // 'newClientName'
 * });
 *
 * @param   {Object}    params            Client parameters.
 * @param   {String}    params.client_id  Application client ID.
 * @param   {Object}    data              Updated client data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'update', 'resource.patch');

/**
 * Delete an Auth0 client.
 *
 * @method    delete
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * management.clients.delete({ client_id: CLIENT_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client deleted.
 * });
 *
 * @param   {Object}    params            Client parameters.
 * @param   {String}    params.client_id  Application client ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'delete', 'resource.delete');

module.exports = ClientsManager;
