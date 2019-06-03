import axios from 'axios';
import createDiapi from '../src/diapi';
import { MODES, CLIENTS } from '../src/consts/constants';

describe('Real client test', () => {
  describe('GET | Axios client', () => {
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
            // baseURL: 'https://private-6a9c9d-diapi.apiary-mock.com'
            baseURL: 'http://localhost:5555'
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
      await expect(api.get('/api/v1/pathNotExisted', {})).rejects.toThrow();
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
        params: { UID: ['123', '124'] }
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

    it('Post | Happy path', async() => {
      const resp = await api.post('/api/v1/addUserDetails', {
        Id: '123',
        Email: 'abcdef@example.com',
        FirstName: 'Tester#1',
        LastName: 'User',
        ProfilePic: 'https://www.example.com/profile/tester001.jpg'
      }); 
      expect(resp).toStrictEqual("Tester#1 User is added"); 
    });


    it('Put | Happy path', async() => {
      const resp = await api.put('/api/v1/UserDetails', {params: {UID: '123'}}, {
        Email: 'abcdef@example.com',
        FirstName: 'Tester#1',
        LastName: 'User',
        ProfilePic: 'https://www.example.com/profile/tester001.jpg'
      })
      expect(resp).toStrictEqual("Tester#1 User details are updated!")
    });

    it('Patch | Happy path', async() => {

    });

    it('Head | Happy path', async() => {});

    it('Options | Happy path', async() => {});
  });
});
