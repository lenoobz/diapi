/**
 * @jest-environment node
 */

import createDiapi from '../src/diapi';
import { MODES, DELAY, CLIENTS } from '../src/consts/constants';
import axios from 'axios';
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
            baseURL: 'https://diapi-mock-server.herokuapp.com'
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
  });

  describe('Mix with Axios | POST requests', () => {
    it('POST | Happy path', async() => {});
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
