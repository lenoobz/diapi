# DiAPI

Api Aid Util

[![Build Status](https://img.shields.io/travis/bxmon/diapi.svg)](https://travis-ci.org/bxmon/diapi)
[![Coverage Status](https://coveralls.io/repos/github/bxmon/diapi/badge.svg?branch=dev)](https://coveralls.io/github/bxmon/diapi?branch=dev)
[![GitHub last commit](https://img.shields.io/github/last-commit/bxmon/diapi.svg)](https://www.npmjs.com/package/diapi)
[![npm version](https://img.shields.io/npm/v/diapi.svg)](https://www.npmjs.com/package/diapi)
[![npm downloads](https://img.shields.io/npm/dt/diapi.svg)](https://www.npmjs.com/package/diapi)
[![NPM](https://img.shields.io/npm/l/diapi.svg)](https://www.npmjs.com/package/diapi)

### Config object initial thought

```json
{
  "mode": "fake | real | mix",
  "real": {
    "client": "axios | fetch | ajax",
    "axios": {
      "instance": axios,
      "bearerToken": null,
      "baseURL": "https://example.com/api/v1",
      "errorHandler": null
    },
    "fetch": {},
    "ajax": {}
  },
  "fake": {
    "delay": 1000,
    "endpoints": {
      "getExampleEndpoint": getExampleHandler,
      "postExampleEndpoint": postExampleHandler,
      "editExampleEndpoint": editExampleHandler,
      "deleteExampleEndPoint": deleteExampleHandler
    }
  }
}
```
