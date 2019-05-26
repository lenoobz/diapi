import Axios from './axios';
import { CLIENTS } from '../consts/constants';
import { defaultAxiosOpts } from '../consts/conf.default';

function Real(opts) {
  switch (opts.client) {
  case CLIENTS.AXIOS:
    return new Axios(Object.assign(defaultAxiosOpts, opts.axios));
  case CLIENTS.FETCH:
    throw new Error('Not yet implemented');
  case CLIENTS.AJAX:
    throw new Error('Not yet implemented');
  default:
    throw new Error('Not supported mode');
  }
}

export default Real;
