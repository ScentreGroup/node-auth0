var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');
/**
 * @class ClientGrantsManager
 * Auth0 Client Grants Manager.
 *
 * See {@link https://auth0.com/docs/api/v2#!/Client_Grants Client Grants}
 *
 * @constructor
 * @memberOf module:management
 *
 * @param {Function} restClientCreator Factory method to create rest client
 */
var ClientGrantsManager = function(restClientCreator) {
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
   * {@link https://auth0.com/docs/api/v2#!/Client_Grants Auth0 Client Grants endpoint}.
   *
   * @type {external:RestClient}
   */
  this.resource = restClientCreator('/client-grants/:id', clientOptions);
};

/**
 * Create an Auth0 client grant.
 *
 * @method    create
 * @memberOf  module:management.ClientGrantsManager.prototype
 *
 * @example
 * management.clientGrants.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client grant created.
 * });
 *
 * @param   {Object}    data     The client data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientGrantsManager, 'create', 'resource.create');

/**
 * Get all Auth0 Client Grants.
 *
 * @method    getAll
 * @memberOf  module:management.ClientGrantsManager.prototype
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
 *
 * management.clientGrants.getAll(params, function (err, grants) {
 *   console.log(grants.length);
 * });
 *
 * @param   {Object}    [params]          Client Grants parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientGrantsManager, 'getAll', 'resource.getAll');

/**
 * Update an Auth0 client grant.
 *
 * @method    update
 * @memberOf  module:management.ClientGrantsManager.prototype
 *
 * @example
 * var data = {
 *   client_id: CLIENT_ID,
 *   audience: AUDIENCE,
 *   scope: []
 * };
 * var params = { id: CLIENT_GRANT_ID };
 *
 * management.clientGrants.update(params, data, function (err, grant) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(grant.id);
 * });
 *
 * @param   {Object}    params     Client parameters.
 * @param   {String}    params.id  Client grant ID.
 * @param   {Object}    data       Updated client data.
 * @param   {Function}  [cb]       Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientGrantsManager, 'update', 'resource.patch');

/**
 * Delete an Auth0 client grant.
 *
 * @method    delete
 * @memberOf  module:management.ClientGrantsManager.prototype
 *
 * @example
 * management.clientGrants.delete({ id: GRANT_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Grant deleted.
 * });
 *
 * @param   {Object}    params     Client parameters.
 * @param   {String}    params.id  Client grant ID.
 * @param   {Function}  [cb]       Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientGrantsManager, 'delete', 'resource.delete');

module.exports = ClientGrantsManager;
