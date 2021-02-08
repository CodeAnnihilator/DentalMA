import { DEVELOPMENT, TEST, PRODUCTION } from '../constants';

export default dbConf => {
  let config;
  console.log(process.env.NODE_ENV)
  switch (process.env.NODE_ENV) {
    case DEVELOPMENT:
      config = dbConf.development;
      break;
    case TEST:
      config = dbConf.test;
      break;
    case PRODUCTION:
      config = dbConf.production;
      break;
    default:
      config = dbConf.development;
  }
  return config;
}