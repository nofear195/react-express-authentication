import useMoveBack from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <main className="flex h-screen items-center justify-center p-10 bg-slate-200">
      <div className="flex border-solid p-10 text-center">
        <h1>The page you are looking for could not be found</h1>
        <button onClick={moveBack}>&larr; Go Back</button>
      </div>
    </main>
  );
}

export default PageNotFound;
