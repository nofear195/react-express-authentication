import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[15rem_1fr] grid-rows-[auto_1fr] bg-slate-200">
      <Header />
      <Sidebar />
      <main className="overflow-auto bg-slate-100 p-16 ">
        <div className="mx-0 my-auto flex max-w-[120rem] flex-col gap-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
