/**
 * @jest-environment node
 */

import createDiapi from '../src/diapi';
import { MODES, DELAY, CLIENTS } from '../src/consts/constants';
import axios from 'axios';
import qs from 'qs';
import * as Fake from './mock-data/fake.data';

describe('Mix modes test suite', () => {
  describe('Mix with Axios | GET requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.MIX,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users': Fake.getAllUsersHandler
          }
        },
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
        users: [Fake.data.userTest0, Fake.data.userTest1, Fake.data.userTest2]
      });
    });

    it('GET | null config object', async() => {
      const resp = await api.get('/api/v1/users');
      expect(resp).toStrictEqual({
        users: [Fake.data.userTest0, Fake.data.userTest1, Fake.data.userTest2]
      });
    });

    it('GET | throw with empty config object', async() => {
      await expect(api.get('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'Error occurred while making a GET request'
      );
    });

    it('GET | throw with null config object', async() => {
      await expect(api.get('/api/v1/pathNotExisted')).rejects.toThrow(
        'Error occurred while making a GET request'
      );
    });

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

  describe('Mix with Axios | POST requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.MIX,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users/setrole': Fake.setUserRoleHandler
          }
        },
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

    it('POST | register user call real endpoint', async() => {
      const resp = await api.post('/api/v1/users/register', {
        body: { ...Fake.data.userTest4 }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest4 });
    }, 15000);

    it('POST | set user role call fake endpoint', async() => {
      const resp = await api.post('/api/v1/users/setrole', {
        body: { ...Fake.data.userTest4 }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest4 });
    }, 15000);

    it('POST | throw with empty config object', async() => {
      await expect(api.post('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'Error occurred while making a POST request'
      );
    });

    it('POST | throw with null config object', async() => {
      await expect(api.post('/api/v1/pathNotExisted')).rejects.toThrow(
        'Error occurred while making a POST request'
      );
    });
  });

  describe('Mix with Axios | PUT requests', () => {
    it('PUT | Happy path', async() => {});
  });

  describe('Mix with Axios | PATCH requests', () => {
    it('PATCH | Happy path', async() => {});
  });

  describe('Mix with Axios | HEAD requests', () => {
    it('HEAD | Happy path', async() => {});
  });

  describe('Mix with Axios | OPTIONS requests', () => {
    it('OPTIONS | Happy path', async() => {});
  });
});
