const MODES = {
  FAKE: 'fake',
  REAL: 'real',
  MIX: 'mix'
};

const CLIENTS = {
  AXIOS: 'axios',
  FETCH: 'fetch',
  AJAX: 'ajax'
};

const DELAY = 1000;

const GENERIC_ERROR_MESSAGE = {
  POST: 'Error occurred while making a POST request',
  GET: 'Error occurred while making a GET request',
  PATCH: 'Error occurred while making a PATCH request',
  PUT: 'Error occurred while making a PUT request',
  HEAD: 'Error occurred while making a HEAD request',
  OPTIONS: 'Error occurred while making a OPTIONS request'
};

export { MODES, CLIENTS, DELAY, GENERIC_ERROR_MESSAGE };
