import Fake from './fake';
import initRealClient from './real';
import processURL from '../utils/url.utils';

function Mix(fakeOpts, realOpts) {
  const { endpoints } = fakeOpts;
  this.endpoints = endpoints;
  this.fakeClient = new Fake(fakeOpts);
  this.realClient = initRealClient(realOpts);
}

Mix.prototype.mutualRequest = function mutualRequest(method) {
  return async function request(url, configs = {}) {
    const processedUrl = processURL(url, configs);
    const handler = this.endpoints[processedUrl];

    if (handler) {
      return this.fakeClient[method](url, configs);
    }

    return this.realClient[method](url, configs);
  };
};

/**
 * Handle http get request with mix mode
 * @param {string} url
 * @param {object} configs
 */
Mix.prototype.get = Mix.prototype.mutualRequest('get');

/**
 * Handle http post request with mix mode
 * @param {string} url
 * @param {object} configs
 */
Mix.prototype.post = Mix.prototype.mutualRequest('post');

/**
 * Handle http put request with mix mode
 * @param {string} url
 * @param {object} configs
 */
Mix.prototype.put = Mix.prototype.mutualRequest('put');

/**
 * Handle http patch request with mix mode
 * @param {string} url
 * @param {object} configs
 */
Mix.prototype.patch = Mix.prototype.mutualRequest('patch');

/**
 * Handle http head request with mix mode
 * @param {string} url
 * @param {object} configs
 */
Mix.prototype.head = Mix.prototype.mutualRequest('head');

/**
 * Handle http options request with mix mode
 * @param {string} url
 * @param {object} configs
 */
Mix.prototype.options = Mix.prototype.mutualRequest('options');

/**
 * Handle http delete request with mix mode
 * @param {string} url
 * @param {object} configs
 */
Mix.prototype.delete = Mix.prototype.mutualRequest('delete');

export default Mix;
