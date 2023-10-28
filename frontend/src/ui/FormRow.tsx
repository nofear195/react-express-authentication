import { ReactNode } from "react";

interface Props {
  id?: string;
  category: string;
  label?: string;
  error?: string;
  children: ReactNode;
}

function FormRow({ id, category, label, error, children }: Props) {
  return (
    <div
      className={
        category === "vertical"
          ? `grid grid-cols-[24rem_1fr_1.2fr] items-center gap-8 py-4 `
          : "flex flex-col items-center gap-8 py-4"
      }
    >
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-base text-red-500">{error}</span>}
    </div>
  );
}

export default FormRow;
