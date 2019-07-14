/**
 * @jest-environment node
 */

import { CLIENTS, MODES } from '../src/consts/constants';

import axios from 'axios';
import qs from 'qs';
import createDiapi from '../src/diapi';
import * as Fake from './mock-data/fake.data';

describe('Real client test suite', () => {
  describe('Real with Axios | GET requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.REAL,
        real: {
          client: CLIENTS.AXIOS,
          axios: {
            instance: axios,
            accessToken: null,
            baseURL: 'https://diapi-mock-server.herokuapp.com',
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: 'repeat' })
          }
        }
      };
      api = createDiapi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it('GET | empty config object', async() => {
      const resp = await api.get('/api/v1/users', {});
      expect(resp).toStrictEqual({
        users: [
          Fake.data.userTest0,
          Fake.data.userTest1,
          Fake.data.userTest2,
          Fake.data.userTest3
        ]
      });
    }, 15000);

    it('GET | object with null config', async() => {
      const resp = await api.get('/api/v1/users');
      expect(resp).toStrictEqual({
        users: [
          Fake.data.userTest0,
          Fake.data.userTest1,
          Fake.data.userTest2,
          Fake.data.userTest3
        ]
      });
    }, 15000);

    it('GET | throw with empty config object', async() => {
      await expect(api.get('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'Error occurred while making a GET request'
      );
    }, 15000);

    it('GET | throw with null config object', async() => {
      await expect(api.get('/api/v1/pathNotExisted')).rejects.toThrow(
        'Error occurred while making a GET request'
      );
    }, 15000);

    it('GET | with params', async() => {
      const resp = await api.get('/api/v1/users-filter', {
        params: { uid: '0' }
      });
      expect(resp).toStrictEqual({ users: [Fake.data.userTest0] });
    }, 15000);

    it('GET | with array params', async() => {
      const resp = await api.get('/api/v1/users-filter', {
        params: { uid: [0, 1] }
      });
      expect(resp).toStrictEqual({
        users: [Fake.data.userTest0, Fake.data.userTest1]
      });
    }, 15000);
  });

  describe('Real with Axios | POST requests', () => {
    it('POST | Happy path', async() => {});
  });

  describe('Real with Axios | PUT requests', () => {
    it('PUT | Happy path', async() => {});
  });

  describe('Real with Axios | PATCH requests', () => {
    it('PATCH | Happy path', async() => {});
  });

  describe('Real with Axios | HEAD requests', () => {
    it('HEAD | Happy path', async() => {});
  });

  describe('Real with Axios | OPTIONS requests', () => {
    it('OPTIONS | Happy path', async() => {});
  });
});
