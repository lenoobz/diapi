import { MODES } from './consts/constants';
import Mix from './clients/mix';
import Fake from './clients/fake';
import initRealClient from './clients/real';

/**
 * Create new http client base on opts
 * @param {*} opts : Options object
 */
function createDiapi(opts) {
  // Create new client instance base on config
  // If real mode return a new real client instance
  // If fake mode return a new fake client instance
  // If mix mode return both real and fake client instances
  switch (opts.mode) {
  case MODES.FAKE:
    return new Fake(opts.fake);
  case MODES.REAL:
    return initRealClient(opts.real);
  case MODES.MIX:
    return new Mix(opts.fake, opts.real);
  default:
    throw new Error('Not supported mode');
  }
}

export default createDiapi;
