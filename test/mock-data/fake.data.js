const getUserDetailHandler = () => {
  return {
    id: '123',
    email: 'abcdef@example.com',
    firstName: 'Tester#1',
    lastName: 'User',
    profilePic: 'https://www.example.com/profile/tester001.jpg'
  };
};

const getUserDetailsHandler = () => {
  return [
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
  ];
};

const getUserDetailsByIdHandler = () => {
  return {
    id: '123',
    email: 'abcdef@example.com',
    firstName: 'Tester#1',
    lastName: 'User',
    profilePic: 'https://www.example.com/profile/tester001.jpg'
  };
};

const getUserDetailsByIdsHandler = () => {
  return [
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
  ];
};

export {
  getUserDetailHandler,
  getUserDetailsHandler,
  getUserDetailsByIdHandler,
  getUserDetailsByIdsHandler
};
