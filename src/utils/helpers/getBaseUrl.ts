const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }

  if (process.env.PRODUCTION_URL) {
    return `https://${process.env.PRODUCTION_URL}`;
  }

  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `https://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default getBaseUrl;
