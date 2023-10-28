function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <main className="flex h-screen items-center justify-center bg-slate-100 p-16">
      <div className="bg-slate-0 flex flex-col rounded-md border border-solid border-slate-400 p-16 text-center">
        <h1 className="mb-6 text-lg font-bold">Something went wrong</h1>
        <p className="my-4 text-rose-500">{error.stack}</p>
        <button
          className="p-2 bg-blue-200 rounded-md"
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      </div>
    </main>
  );
}

export default ErrorFallback;
