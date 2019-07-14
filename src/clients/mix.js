import Fake from './fake';
import initRealClient from './real';
import processURL from '../utils/url.utils';

function Mix(fakeOpts, realOpts) {
  const { endpoints } = fakeOpts;
  this.endpoints = endpoints;
  this.fakeClient = new Fake(fakeOpts);
  this.realClient = initRealClient(realOpts);
}

Mix.prototype.get = async function get(url, configs = {}) {
  const processedUrl = processURL(url, configs);
  const handler = this.endpoints[processedUrl];

  if (handler) {
    return this.fakeClient.get(url, configs);
  }

  return this.realClient.get(url, configs);
};

Mix.prototype.post = async function post(url, configs = {}) {
  const processedUrl = processURL(url, configs);
  const handler = this.endpoints[processedUrl];

  if (handler) {
    return this.fakeClient.post(url, configs);
  }

  return this.realClient.post(url, configs);
};

Mix.prototype.put = async function put() {
  throw new Error('Not yet implemented');
};

Mix.prototype.patch = async function patch() {
  throw new Error('Not yet implemented');
};

Mix.prototype.head = async function head() {
  throw new Error('Not yet implemented');
};

Mix.prototype.options = async function options() {
  throw new Error('Not yet implemented');
};

Mix.prototype.delete = async function deleteMethod() {
  throw new Error('Not yet implemented');
};

export default Mix;
