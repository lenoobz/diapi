import createDiapi from '../src/diapi';
import { MODES, DELAY } from '../src/consts/constants';
import {
  getUserDetailHandler,
  getUserDetailsHandler,
  getUserDetailsByIdHandler,
  getUserDetailsByIdsHandler
} from './mock-data/fake.data';

describe('Fake modes test', () => {
  describe('Fake client', () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: MODES.FAKE,
        fake: {
          delay: DELAY,
          endpoints: {
            '/api/v1/getUserDetail': getUserDetailHandler,
            '/api/v1/getUserDetails': getUserDetailsHandler,
            '/api/v1/getUserDetails?uid=123': getUserDetailsByIdHandler,
            '/api/v1/getUserDetails?uid=123&uid=124': getUserDetailsByIdsHandler
          }
        }
      };
      api = createDiapi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it('GET | object', async() => {
      const resp = await api.get('/api/v1/getUserDetail', {});
      expect(resp).toStrictEqual({
        id: '123',
        email: 'abcdef@example.com',
        firstName: 'Tester#1',
        lastName: 'User',
        profilePic: 'https://www.example.com/profile/tester001.jpg'
      });
    });

    it('GET | object with null config', async() => {
      const resp = await api.get('/api/v1/getUserDetail');
      expect(resp).toStrictEqual({
        id: '123',
        email: 'abcdef@example.com',
        firstName: 'Tester#1',
        lastName: 'User',
        profilePic: 'https://www.example.com/profile/tester001.jpg'
      });
    });

    it('GET | array', async() => {
      const resp = await api.get('/api/v1/getUserDetails', {});
      expect(resp).toStrictEqual([
        {
          id: '123',
          email: 'abcdef@example.com',
          firstName: 'Tester#1',
          lastName: 'User',
          profilePic: 'https://www.example.com/profile/tester001.jpg'
        },
        {
          id: '124',
          email: 'abcdeg@example.com',
          firstName: 'Tester#2',
          lastName: 'User',
          profilePic: 'https://www.example.com/profile/tester002.jpg'
        }
      ]);
    });

    it('Get | throw', async() => {
      await expect(api.get('/api/v1/pathNotExisted', {})).rejects.toThrow(
        'No handler provided'
      );
    });

    it('Get | with params', async() => {
      const resp = await api.get('/api/v1/getUserDetails', {
        params: { uid: '123' }
      });
      expect(resp).toStrictEqual({
        id: '123',
        email: 'abcdef@example.com',
        firstName: 'Tester#1',
        lastName: 'User',
        profilePic: 'https://www.example.com/profile/tester001.jpg'
      });
    });

    it('Get | with array params', async() => {
      const resp = await api.get('/api/v1/getUserDetails', {
        params: { uid: ['123', '124'] }
      });
      expect(resp).toStrictEqual([
        {
          id: '123',
          email: 'abcdef@example.com',
          firstName: 'Tester#1',
          lastName: 'User',
          profilePic: 'https://www.example.com/profile/tester001.jpg'
        },
        {
          id: '124',
          email: 'abcdeg@example.com',
          firstName: 'Tester#2',
          lastName: 'User',
          profilePic: 'https://www.example.com/profile/tester002.jpg'
        }
      ]);
    });

    it('Post | Happy path', async() => {});

    it('Put | Happy path', async() => {});

    it('Patch | Happy path', async() => {});

    it('Head | Happy path', async() => {});

    it('Options | Happy path', async() => {});
  });
});
