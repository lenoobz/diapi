/** ****************************************************************************
 * Mock data
 ******************************************************************************/
const data = {
  userTest0: {
    id: 0,
    firstname: 'Dev 0',
    lastname: 'Test',
    fullname: 'Dev 0 Test',
    email: 'dev0@test.com',
    profilePic: 'http://test.com/dev0/profile.jpg',
    createAt: '2017-08-30T13:35:00Z',
    isActive: true
  },
  userTest1: {
    id: 1,
    firstname: 'Dev 1',
    lastname: 'Test',
    fullname: 'Dev 1 Test',
    email: 'dev1@test.com',
    profilePic: 'http://test.com/dev1/profile.jpg',
    createAt: '2017-08-30T13:35:00Z',
    isActive: true
  },
  userTest2: {
    id: 2,
    firstname: 'Dev 2',
    lastname: 'Test',
    fullname: 'Dev 2 Test',
    email: 'dev1@test.com',
    profilePic: 'http://test.com/dev2/profile.jpg',
    createAt: '2017-08-30T13:35:00Z',
    isActive: true
  }
};

/** ****************************************************************************
 * Fake get handlers
 ******************************************************************************/
const getUserByIdHandler = () => {
  return {
    userDetails: data.userTest1
  };
};

const getUsersByIdsHandler = () => {
  return {
    users: [data.userTest0, data.userTest1]
  };
};

const getAllUsersHandler = () => {
  return {
    users: [data.userTest0, data.userTest1, data.userTest2]
  };
};

/** ****************************************************************************
 * Fake post handlers
 ******************************************************************************/

const registerUserHandler = () => {
  return {
    userDetails: {
      id: 1,
      firstname: 'Dev',
      lastname: 'Test',
      fullname: 'Dev Test',
      email: 'dev@test.com',
      profilePic: 'http://test.com/dev/profile.jpg',
      createAt: '2017-08-30T13:35:00Z',
      isActive: true
    }
  };
};

export {
  data,
  getUserByIdHandler,
  getUsersByIdsHandler,
  getAllUsersHandler,
  registerUserHandler
};
