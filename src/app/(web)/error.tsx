'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='container mx-auto'>
      <h2 className='font-heading text-red-800 mb-10'>Something went wrong!</h2>

      <button onClick={() => reset()} className='btn-primary'>
        Try Again
      </button>
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-unused-vars */
