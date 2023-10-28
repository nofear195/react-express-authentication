import Logo from "../ui/Logo";
import SignupForm from "../features/authentication/SignupForm";

function Signup() {
  return (
    <main className="bg-slate-0 grid h-screen grid-cols-[60rem] content-center justify-center gap-10">
      <Logo />
      <SignupForm />
    </main>
  );
}

export default Signup;
