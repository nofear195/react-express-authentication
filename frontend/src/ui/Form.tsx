import { FormEventHandler, ReactNode } from "react";

function Form({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form
      className="overflow-hidden rounded-md border border-solid bg-slate-50 px-10 py-6 text-base"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
