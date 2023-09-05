import React from "react";
import { Outlet, Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/authSlice";

export default function Layout() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-stone-50 h-screen [&>*]:px-40">
      <header className="h-14 bg-stone-200 border-b-stone-300 border">
        <nav className="flex justify-between items-center h-full">
          <Link to="/">Header</Link>
          {auth.logged ? (
            <button onClick={() => dispatch(logout())}>Log out</button>
          ) : (
            <Link to="/signup">Sign Up</Link>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
