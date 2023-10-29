import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { ReactNode, useEffect } from "react";
import Spinner from "./Spinner";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isVerified } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isVerified && !isLoading) navigate("/login");
    },
    [isVerified, isLoading, navigate],
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );
  // 4. If there IS a user, render the app
  if (isVerified) return children;
}

export default ProtectedRoute;
