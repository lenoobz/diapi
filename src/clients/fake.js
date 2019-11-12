import { defaultFakeOpts } from '../consts/conf.default';
import processURL from '../utils/url.utils';

/**
 * Fake client constructor
 * @param {*} opts
 */
function Fake(opts) {
  this.defaults = Object.assign(defaultFakeOpts, opts);
}

/**
 * Mutual request is called by all fake request. All fake requests
 * are basically the same. They are all return a promise.
 * @param {string} url
 * @param {object} configs
 */
Fake.prototype.mutualRequest = function request(url, configs = {}) {
  const processedUrl = processURL(url, configs);
  const { delay, endpoints } = this.defaults;
  const handler = endpoints[processedUrl];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (handler) {
        resolve(handler(configs));
      } else {
        reject(new Error('No handler provided'));
      }
    }, delay);
  });
};

/**
 * Get method mimics http get request
 * @param {string} url
 * @param {object} configs
 */
Fake.prototype.get = Fake.prototype.mutualRequest;

/**
 * Post method mimics http post request
 * @param {string} url
 * @param {object} configs
 */
Fake.prototype.post = Fake.prototype.mutualRequest;

/**
 * Put method mimics http put request
 * @param {string} url
 * @param {object} configs
 */
Fake.prototype.put = Fake.prototype.mutualRequest;

/**
 * Patch method mimics http patch request
 * @param {string} url
 * @param {object} configs
 */
Fake.prototype.patch = Fake.prototype.mutualRequest;

/**
 * Head method mimics http head request
 * @param {string} url
 * @param {object} configs
 */
Fake.prototype.head = Fake.prototype.mutualRequest;

/**
 * Options method mimics http options request
 * @param {string} url
 * @param {object} configs
 */
Fake.prototype.options = Fake.prototype.mutualRequest;

/**
 * Delete method mimics http delete request
 * @param {string} url
 * @param {object} configs
 */
Fake.prototype.delete = Fake.prototype.mutualRequest;

export default Fake;
