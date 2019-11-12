import createDiapi from '../src/diapi';
import { MODES, DELAY } from '../src/consts/constants';
import * as Fake from './mock-data/fake.data';

describe('Fake modes test suite', () => {
  describe('Fake | GET requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.FAKE,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users': Fake.getAllUsersHandler,
            '/api/v1/users/1': Fake.getUserByIdHandler,
            '/api/v1/users?uid=0': Fake.getUserByIdHandler,
            '/api/v1/users?uid=0&uid=1': Fake.getUsersByIdsHandler
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
        'No handler provided'
      );
    });

    it('GET | throw with null config object', async() => {
      await expect(api.get('/api/v1/pathNotExisted')).rejects.toThrow(
        'No handler provided'
      );
    });

    it('GET | with params', async() => {
      const resp = await api.get('/api/v1/users', {
        params: { uid: '0' }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest0 });
    });

    it('GET | with array params', async() => {
      const resp = await api.get('/api/v1/users', {
        params: { uid: ['0', '1'] }
      });
      expect(resp).toStrictEqual({
        users: [Fake.data.userTest0, Fake.data.userTest1]
      });
    });
  });

  describe('Fake | POST requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.FAKE,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users/register': Fake.registerUserHandler
          }
        }
      };
      api = createDiapi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it('POST | with body', async() => {
      const resp = await api.post('/api/v1/users/register', {
        body: { ...Fake.data.userTest4 }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest4 });
    });

    it('POST | throw with empty config object', async() => {
      await expect(api.post('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'No handler provided'
      );
    });

    it('POST | throw with null config object', async() => {
      await expect(api.post('/api/v1/pathNotExisted')).rejects.toThrow(
        'No handler provided'
      );
    });
  });

  describe('Fake | PUT requests', () => {
    it('PUT | Happy path', async() => {});
  });

  describe('Fake | PATCH requests', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.FAKE,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/users/patchUser': Fake.patchUserInfoHandler
          }
        }
      };
      api = createDiapi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it('PATCH | with body', async() => {
      const resp = await api.post('/api/v1/users/patchUser', {
        body: { lastname: 'Test Patch', fullname: 'Dev 4 Test Patch' }
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.patchUserTest4 });
    });

    it('PATCH | throw with empty config object', async() => {
      await expect(api.patch('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'No handler provided'
      );
    });

    it('PATCH | throw with null config object', async() => {
      await expect(api.patch('/api/v1/pathNotExisted')).rejects.toThrow(
        'No handler provided'
      );
    });
  });

  describe('Fake | HEAD requests', () => {
    it('HEAD | Happy path', async() => {});
  });

  describe('Fake | OPTIONS requests', () => {
    it('OPTIONS | Happy path', async() => {});
  });
});
