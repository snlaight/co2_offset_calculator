import getEnvSafely from '@/utils/env/utils';

const OPENAI_API_KEY = getEnvSafely('OPENAI_API_KEY');

const env = {
  OPENAI_API_KEY,
};

export default env;
