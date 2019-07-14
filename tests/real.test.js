/**
 * @jest-environment node
 */

import { CLIENTS, MODES } from '../src/consts/constants';

import axios from 'axios';
import createDiapi from '../src/diapi';

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
        users: [
          {
            id: 0,
            firstname: 'Dev 0',
            lastname: 'Test',
            fullname: 'Dev 0 Test',
            email: 'dev0@test.com',
            profilePic: 'http://test.com/dev0/profile.jpg',
            createAt: '2017-08-30T13:35:00Z',
            isActive: true
          }
        ]
      });
    });

    it('GET | object with null config', async() => {
      const resp = await api.get('/api/v1/users');
      expect(resp).toStrictEqual({
        users: [
          {
            id: 0,
            firstname: 'Dev 0',
            lastname: 'Test',
            fullname: 'Dev 0 Test',
            email: 'dev0@test.com',
            profilePic: 'http://test.com/dev0/profile.jpg',
            createAt: '2017-08-30T13:35:00Z',
            isActive: true
          }
        ]
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
