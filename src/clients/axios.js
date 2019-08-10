import { GENERIC_ERROR_MESSAGE } from '../consts/constants';

function Axios(opts) {
  const { instance, accessToken, errorHandler, ...restOpts } = opts;
  this.axiosOpts = restOpts;
  this.accessToken = accessToken;
  this.errorHandler = errorHandler;
  this.axios = instance.create(restOpts);
}

function getHeaderConfigs(conf, token) {
  let hasHeader = false;
  let mergeHeaders = {};
  let authHeader = null;
  const { accessToken, headers } = conf;

  if (accessToken) {
    authHeader = { Authorization: `bearer ${accessToken}` };
  } else if (token) {
    authHeader = { Authorization: `bearer ${token}` };
  }

  if (authHeader) {
    hasHeader = true;
    mergeHeaders = Object.assign(mergeHeaders, authHeader);
  }

  if (headers) {
    hasHeader = true;
    mergeHeaders = Object.assign(mergeHeaders, headers);
  }

  return hasHeader ? { headers: mergeHeaders } : {};
}

function getParamConfigs(conf) {
  const { params } = conf;
  return params ? { params } : {};
}

Axios.prototype.get = async function get(url, configs = {}) {
  try {
    const params = getParamConfigs(configs);
    const header = getHeaderConfigs(configs, this.accessToken);
    const resp = await this.axios.get(url, {
      ...this.axiosOpts,
      ...header,
      ...params
    });
    return resp.data ? resp.data : resp;
  } catch (e) {
    this.errorHandler(e, GENERIC_ERROR_MESSAGE.GET);
    return null;
  }
};

Axios.prototype.post = async function post(url, configs = {}) {
  try {
    const { body = {} } = configs;
    const header = getHeaderConfigs(configs);
    const resp = await this.axios.post(url, body, {
      ...this.axiosOpts,
      ...header
    });
    return resp.data ? resp.data : resp;
  } catch (e) {
    this.errorHandler(e, GENERIC_ERROR_MESSAGE.POST);
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
