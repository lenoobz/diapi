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
            bearerToken: null,
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
            bearerToken: null,
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
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.MIX,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users/0': Fake.getUserByIdHandler
          }
        },
        real: {
          client: CLIENTS.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
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

    it('PUT | register user call real endpoint', async() => {
      const resp = await api.put('/api/v1/users/2', {
        body: { ...Fake.data.userTest2 }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest2 });
    }, 15000);

    it('PUT | set user role call fake endpoint', async() => {
      const resp = await api.put('/api/v1/users/0', {
        body: { ...Fake.data.userTest0 }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest0 });
    }, 15000);

    it('PUT | throw with empty config object', async() => {
      await expect(api.put('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'Error occurred while making a PUT request'
      );
    });

    it('PUT | throw with null config object', async() => {
      await expect(api.put('/api/v1/pathNotExisted')).rejects.toThrow(
        'Error occurred while making a PUT request'
      );
    });
  });

  describe('Mix with Axios | PATCH requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.MIX,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users/patchUser': Fake.patchUserInfoHandler
          }
        },
        real: {
          client: CLIENTS.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
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

    it('PATCH | register user call real endpoint', async() => {
      const resp = await api.patch('/api/v1/users/1', {
        body: { ...Fake.data.userTest4 }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest4 });
    }, 15000);

    it('PATCH | set user role call fake endpoint', async() => {
      const resp = await api.patch('/api/v1/users/patchUser', {
        body: { lastname: 'Test Patch', fullname: 'Dev 4 Test Patch' }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.patchUserTest4 });
    }, 15000);

    it('PATCH | throw with empty config object', async() => {
      await expect(api.patch('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'Error occurred while making a PATCH request'
      );
    });

    it('PATCH | throw with null config object', async() => {
      await expect(api.patch('/api/v1/pathNotExisted')).rejects.toThrow(
        'Error occurred while making a PATCH request'
      );
    });
  });

  describe('Mix with Axios | DELETE requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.MIX,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users/4': Fake.deleteUserInfoHandler
          }
        },
        real: {
          client: CLIENTS.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
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

    it('DELETE | register user call real endpoint', async() => {
      const resp = await api.delete('/api/v1/users/1');
      expect(resp).toStrictEqual({ 'message': 'Success' });
    }, 15000);

    it('POST | register user call real endpoint', async() => {
      const resp = await api.post('/api/v1/users/register', {
        body: { ...Fake.data.userTest1 }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest1 });
    }, 15000);

    it('DELETE | set user role call fake endpoint', async() => {
      const resp = await api.delete('/api/v1/users/4');
      expect(resp).toStrictEqual({ 'message': 'Success' });
    }, 15000);

    it('DELETE | throw with empty config object', async() => {
      await expect(api.delete('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'Error occurred while making a DELETE request'
      );
    });

    it('DELETE | throw with null config object', async() => {
      await expect(api.delete('/api/v1/pathNotExisted')).rejects.toThrow(
        'Error occurred while making a DELETE request'
      );
    });
  });

  describe('Mix with Axios | HEAD requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.MIX,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users/statusFake': Fake.statusUserHandler
          }
        },
        real: {
          client: CLIENTS.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
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

    it('HEAD | register user call real endpoint', async() => {
      const resp = await api.head('/api/v1/users/status');
      expect(resp).toHaveProperty('content-length');
    }, 15000);

    it('HEAD | set user role call fake endpoint', async() => {
      const resp = await api.head('/api/v1/users/statusFake');
      expect(resp).toBeUndefined();
    }, 15000);

    it('HEAD | throw with empty config object', async() => {
      await expect(api.head('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'Error occurred while making a HEAD request'
      );
    });

    it('HEAD | throw with null config object', async() => {
      await expect(api.head('/api/v1/pathNotExisted')).rejects.toThrow(
        'Error occurred while making a HEAD request'
      );
    });
  });

  describe('Mix with Axios | OPTIONS requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.MIX,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users/4': Fake.optionsHandler
          }
        },
        real: {
          client: CLIENTS.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
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

    it('OPTIONS | register user call real endpoint', async() => {
      const resp = await api.options('/api/v1/users/2');
      expect(resp).toHaveProperty('access-control-allow-headers');
    }, 15000);

    it('OPTIONS | set user role call fake endpoint', async() => {
      const resp = await api.options('/api/v1/users/4');
      expect(resp).toBeUndefined();
    }, 15000);

    it('OPTIONS | throw with empty config object', async() => {
      await expect(api.options('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'Error occurred while making OPTIONS request'
      );
    });

    it('OPTIONS | throw with null config object', async() => {
      await expect(api.options('/api/v1/pathNotExisted')).rejects.toThrow(
        'Error occurred while making OPTIONS request'
      );
    });
  });
});
