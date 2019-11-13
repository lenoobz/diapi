import { GENERIC_ERROR_MESSAGE } from '../consts/constants';

function Axios(opts) {
  const { instance, headerOpts, bearerToken, errorHandler, ...restOpts } = opts;
  this.axiosOpts = restOpts;
  this.headerOpts = headerOpts;
  this.bearerToken = bearerToken;
  this.errorHandler = errorHandler;
  this.axios = instance.create(restOpts);
}

Axios.prototype.extractHeader = function extractHeader(
  headerOpts,
  bearerToken = null
) {
  const accessToken = bearerToken || this.bearerToken;
  let headers = Object.assign({}, this.headerOpts, headerOpts);

  if (accessToken) {
    headers = Object.assign(headers, {
      Authorization: `Bearer ${accessToken}`
    });
  }

  return { headers };
};

Axios.prototype.extractParams = function extractParams(params) {
  return params ? { params } : {};
};

/**
 * Get request handler
 * @param {string} url           Endpoint url.
 * @param {{
 *            headers:(object | undefined),
 *            params:(object | undefined),
 *            bearerToken:(string | undefined),
 *            errorHandler: (function | undefined)
 *        }} payload             Payload object will be used for the request.
 */
Axios.prototype.get = async function get(url, payload = {}) {
  // Extract request detail from payload object
  const { headers, params, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const paramOpts = this.extractParams(params);

    // Extract headers
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.get(url, {
      ...this.axiosOpts,
      ...headerOpts,
      ...paramOpts
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
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
 *            bearerToken:(string | undefined),
 *            errorHandler: (function | undefined)
 *        }} payload             Payload object will be used for the request.
 */
Axios.prototype.post = async function post(url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.post(url, body, {
      ...this.axiosOpts,
      ...headerOpts
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, GENERIC_ERROR_MESSAGE.POST);
    }
    return null;
  }
};

/**
 * Put request handler
 * @param {string} url           Endpoint url.
 * @param {{
  *            headers:(object | undefined),
  *            body:(object | undefined),
  *            bearerToken:(string | undefined),
  *            errorHandler: (function | undefined)
  *        }} payload             Payload object will be used for the request.
  */
Axios.prototype.put = async function put(url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.put(url, body, {
      ...this.axiosOpts,
      ...headerOpts
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, GENERIC_ERROR_MESSAGE.PUT);
    }
    return null;
  }
};

/**
 * Patch request handler
 * @param {string} url           Endpoint url.
 * @param {{
  *            headers:(object | undefined),
  *            body:(object | undefined),
  *            bearerToken:(string | undefined),
  *            errorHandler: (function | undefined)
  *        }} payload             Payload object will be used for the request.
  */
Axios.prototype.patch = async function path(url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.patch(url, body, {
      ...this.axiosOpts,
      ...headerOpts
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, GENERIC_ERROR_MESSAGE.PATCH);
    }
    return null;
  }
};

/**
 * Delete request handler
 * @param {string} url           Endpoint url.
 * @param {{
  *            headers:(object | undefined),
  *            body:(object | undefined),
  *            bearerToken:(string | undefined),
  *            errorHandler: (function | undefined)
  *        }} payload             Payload object will be used for the request.
  */
Axios.prototype.delete = async function deleteMethod(url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.delete(url, body, {
      ...this.axiosOpts,
      ...headerOpts
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, GENERIC_ERROR_MESSAGE.DELETE);
    }
    return null;
  }
};

/**
 * Head request handler
 * @param {string} url           Endpoint url.
 * @param {{
  *            headers:(object | undefined),
  *            body:(object | undefined),
  *            bearerToken:(string | undefined),
  *            errorHandler: (function | undefined)
  *        }} payload             Payload object will be used for the request.
  */
Axios.prototype.head = async function head(url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.head(url, body, {
      ...this.axiosOpts,
      ...headerOpts
    });

    // Return response data
    return resp.headers ? resp.headers : null;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, GENERIC_ERROR_MESSAGE.HEAD);
    }
    return null;
  }
};

/**
 * Options request handler
 * @param {string} url           Endpoint url.
 * @param {{
  *            headers:(object | undefined),
  *            body:(object | undefined),
  *            bearerToken:(string | undefined),
  *            errorHandler: (function | undefined)
  *        }} payload             Payload object will be used for the request.
  */
Axios.prototype.options = async function options(url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.options(url, body, {
      ...this.axiosOpts,
      ...headerOpts
    });

    // Return response data
    return resp.headers ? resp.headers : null;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, GENERIC_ERROR_MESSAGE.OPTIONS);
    }
    return null;
  }
};

export default Axios;
