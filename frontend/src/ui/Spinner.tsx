function Spinner() {
  return (
    <div className="mx-auto flex h-[6rem] w-[6rem] animate-spin  items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-pink-400 to-90%">
      <div className="h-[5rem] w-[5rem] rounded-full bg-slate-100"></div>
    </div>
  );
}

export default Spinner;
