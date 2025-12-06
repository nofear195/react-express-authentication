import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { ReactNode } from "react";
import Spinner from "./Spinner";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoading, isVerified, error } = useUser();

  if (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-50 text-center text-slate-700">
        <p className="text-lg font-semibold">Unable to reach the backend API.</p>
        <p className="text-sm text-slate-500">{errorMessage || "Please try again later."}</p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );

  if (!isVerified) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
