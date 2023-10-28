import Logo from "../ui/Logo";
import LoginFrom from "../features/authentication/LoginForm";
function Login() {
  return (
    <main className="grid h-screen grid-cols-[60rem] content-center justify-center gap-10 bg-slate-0">
      <Logo />
      <LoginFrom />
    </main>
  );
}

export default Login;
