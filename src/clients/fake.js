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
 * Get method mimics http get request
 * @param {string} url
 * @param {object} configs
 */
Fake.prototype.get = function get(url, configs = {}) {
  const processedUrl = processURL(url, configs);
  const { delay, endpoints } = this.defaults;
  const handler = endpoints[processedUrl];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (handler) {
        resolve(handler());
      } else {
        reject(new Error('No handler provided'));
      }
    }, delay);
  });
};

Fake.prototype.post = function post(url /* , configs */) {
  const { delay, endpoints } = this.defaults;
  const handler = endpoints[url];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (handler) {
        resolve(handler());
      } else {
        reject(new Error('No handler provided'));
      }
    }, delay);
  });
  
};

Fake.prototype.put = function put() {
  throw new Error('Not yet implemented');
};

Fake.prototype.patch = function patch() {
  throw new Error('Not yet implemented');
};

Fake.prototype.head = function head() {
  throw new Error('Not yet implemented');
};

Fake.prototype.options = function options() {
  throw new Error('Not yet implemented');
};

Fake.prototype.delete = function deleteMethod() {
  throw new Error('Not yet implemented');
};

export default Fake;
