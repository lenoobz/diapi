import { GENERIC_ERROR_MESSAGE } from '../consts/constants';

function Axios(opts) {
  const { instance, accessToken, errorHandler, ...restOpts } = opts;
  this.axiosOpts = restOpts;
  this.accessToken = accessToken;
  this.errorHandler = errorHandler;
  this.axios = instance.create(restOpts);
}

Axios.prototype.getHeaderConfigs = function getHeaderConfigs(headers, token) {
  let authHeader = null;
  const accessToken = token || this.accessToken;

  if (accessToken) {
    authHeader = { Authorization: `Bearer ${accessToken}` };
  }

  return authHeader || headers
    ? { headers: Object.assign({}, authHeader, headers) }
    : {};
};

Axios.prototype.getParamConfigs = function getParamConfigs(params) {
  return params ? { params } : {};
};

/**
 * Get request handler
 * @param {string} url           Endpoint url.
 * @param {{
 *            headers:(object | undefined),
 *            params:(object | undefined),
 *            accessToken:(string | undefined),
 *            errorHandler: (function | undefined)
 *        }} configs             Config object will be used for the request.
 */
Axios.prototype.get = async function get(url, configs = {}) {
  try {
    const { headers: headersConf, params: paramsConf, accessToken } = configs;
    const params = this.getParamConfigs(paramsConf);
    const headers = this.getHeaderConfigs(headersConf, accessToken);
    const resp = await this.axios.get(url, {
      ...this.axiosOpts,
      ...headers,
      ...params
    });
    return resp.data ? resp.data : resp;
  } catch (e) {
    const { errorHandler } = configs;
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, GENERIC_ERROR_MESSAGE.GET);
    }
    return null;
  }
};

/**
 * Post request handler
 * @param {string} url           Endpoint url.
 * @param {{
  *            headers:(object | undefined),
  *            body:(object | undefined),
  *            accessToken:(string | undefined),
  *            errorHandler: (function | undefined)
  *        }} configs             Config object will be used for the request.
  */
Axios.prototype.post = async function post(url, configs = {}) {
  try {
    const { headers: headersConf, body = {}, accessToken } = configs;
    const header = this.getHeaderConfigs(headersConf, accessToken);
    const resp = await this.axios.post(url, body, {
      ...this.axiosOpts,
      ...header
    });
    return resp.data ? resp.data : resp;
  } catch (e) {
    const { errorHandler } = configs;
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, GENERIC_ERROR_MESSAGE.POST);
    }
    return null;
  }
};

Axios.prototype.put = function put() {
  throw new Error('Not yet implemented');
};

Axios.prototype.patch = function path() {
  throw new Error('Not yet implemented');
};

Axios.prototype.head = function head() {
  throw new Error('Not yet implemented');
};

Axios.prototype.options = function options() {
  throw new Error('Not yet implemented');
};

Axios.prototype.delete = function deleteMethod() {
  throw new Error('Not yet implemented');
};

export default Axios;
