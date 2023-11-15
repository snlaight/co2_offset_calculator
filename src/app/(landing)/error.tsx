'use client';

import EmptyError from '@/components/sections/EmptyError';

const Error = ({ error, reset } : {
  error: Error & { digest: string }
  reset: () => void
}) => {
  <EmptyError label={error.message} onReset={reset} />;
};

export default Error;
