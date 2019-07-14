import qs from 'qs';

/**
 * Helper function to process an url by parsing parameters config object
 * @param {string} url : base url
 * @param {object} configs : parameters config
 */
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
