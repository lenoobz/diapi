import { GENERIC_ERROR_MESSAGE } from '../consts/constants';

function Axios(opts) {
  const { instance, accessToken, errorHandler, ...restOpts } = opts;
  this.axiosOpts = restOpts;
  this.accessToken = accessToken;
  this.errorHandler = errorHandler;
  this.axios = instance.create(restOpts);
}

function getHeaderConfigs(conf, accessToken) {
  const { token } = conf;

  if (token) {
    return { headers: { Authorization: `bearer ${token}` } };
  }

  if (accessToken) {
    return { headers: { Authorization: `bearer ${accessToken}` } };
  }

  return {};
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

Axios.prototype.post = function post() {
  throw new Error('Not yet implemented');
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
