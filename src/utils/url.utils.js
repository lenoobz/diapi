import qs from 'qs';

const processURL = (url, configs = {}) => {
  let processedUrl = url;
  const queryParams = configs.params;
  if (queryParams) {
    processedUrl = `${url}${qs.stringify(queryParams, {
      addQueryPrefix: true,
      arrayFormat: 'repeat'
    })}`;
  }

  return processedUrl;
};

export default processURL;
