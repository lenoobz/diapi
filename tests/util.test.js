import processURL from '../src/utils/url.utils';

describe('Url utility test suite', () => {
  let baseUrl = 'https://example.com/api/v1';

  it('Url Util | empty config object', () => {
    const url = processURL(baseUrl, {});
    expect(url).toEqual(baseUrl);
  });

  it('Url Util | null config object', () => {
    const url = processURL(baseUrl);
    expect(url).toEqual(baseUrl);
  });

  it('Url Util | simple config object', () => {
    const url = processURL(baseUrl, {
      params: { uid: 0 }
    });
    expect(url).toEqual(`${baseUrl}?uid=0`);
  });

  it('Url Util | config with multiple param values', () => {
    const url = processURL(baseUrl, {
      params: { uid: 0, sortby: 'asc', filterby: 'type="fake"' }
    });
    expect(url).toEqual(
      `${baseUrl}?uid=0&sortby=asc&filterby=type%3D%22fake%22`
    );
  });

  it('Url Util | config with params array', () => {
    const url = processURL(baseUrl, {
      params: { uid: [0, 1, 2] }
    });
    expect(url).toEqual(`${baseUrl}?uid=0&uid=1&uid=2`);
  });
});
