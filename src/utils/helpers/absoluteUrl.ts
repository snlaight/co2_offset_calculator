import getBaseUrl from '@/utils/helpers/getBaseUrl';

const absoluteUrl = (path: string) => {
  const baseUrl = getBaseUrl();

  return `${baseUrl}${path}`;
};

export default absoluteUrl;
