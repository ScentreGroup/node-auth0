/**
 *
 * @param options
 * @param   {Object}  options                                   Options for the ManagementClient SDK.
 *          If a token is provided only the domain is required, other parameters are ignored.
 *          If no token is provided domain, clientId, clientSecret and scopes are required
 * @param   {String}  options.domain                              ManagementClient server domain.
 * @param   {String}  [options.token]                             API access token.
 * @param   {String}  [options.clientId]                          Management API Non Interactive Client Id.
 * @param   {String}  [options.clientSecret]                      Management API Non Interactive Client Secret.
 * @param   {String}  [options.audience]                          Management API Audience. By default is your domain's, e.g. the domain is `tenant.auth0.com` and the audience is `http://tenant.auth0.com/api/v2/`
 * @param   {String}  [options.scope]                             Management API Scopes.
 * @param   {Boolean} [options.tokenProvider.enableCache=true]    Enabled or Disable Cache.
 * @param   {Number}  [options.tokenProvider.cacheTTLInSeconds]   By default the `expires_in` value will be used to determine the cached time of the token, this can be overridden.
 * @param   {Boolean} [options.retry.enabled=true]                Enabled or Disable Retry Policy functionality.
 * @param   {Number}  [options.retry.maxRetries=10]               Retry failed requests X times.
 * @returns {Function}
 * @constructor
 */
var Auth0RestClientFactory = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  return function(path, otherOptions) {
    var defaultOptions = {
      headers: options.headers,
      query: { repeatParams: false }
    };

    var clientOptions = Object.keys(otherOptions || {}).reduce(function(key, acc) {
      acc[key] = otherOptions[key];

      return acc;
    }, defaultOptions);

    var auth0ResetClient = new Auth0RestClient(
      options.baseUrl + path,
      clientOptions,
      options.tokenProvider
    );

    return new RetryRestClient(auth0RestClient, options.retry);
  };
};

module.exports = Auth0RestClientFactory;
