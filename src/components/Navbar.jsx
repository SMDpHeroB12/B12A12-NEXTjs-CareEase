"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  const pathname = usePathname();
  const auth = useAuth();

  if (!auth) return null;

  const { user, logout } = auth;

  const linkClass = (path) =>
    pathname === path
      ? "btn btn-sm btn-primary text-white"
      : "btn btn-sm btn-ghost";

  return (
    <div className="shadow-sm bg-[#ffffff8e] sticky top-0 z-50">
      <div className="navbar px-6 w-11/12 mx-auto">
        {/* LEFT: Logo */}
        <div className="navbar-start">
          {/* Mobile Menu Button */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <HiMenu size={40} />
            </label>

            {/* Mobile Dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/" className={pathname === "/" ? "active" : ""}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className={pathname === "/book" ? "active" : ""}
                >
                  Book Service
                </Link>
              </li>

              {user && (
                <>
                  <li>
                    <Link
                      href="/my-bookings"
                      className={pathname === "/my-bookings" ? "active" : ""}
                    >
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className={pathname === "/profile" ? "active" : ""}
                    >
                      My Profile
                    </Link>
                    <Link href="/admin" className={linkClass("/admin")}>
                      Admin
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </>
              )}

              {!user && (
                <li className="flex flex-col">
                  <Link
                    href="/login"
                    className={pathname === "/login" ? "active" : ""}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={pathname === "/register" ? "active" : ""}
                  >
                    Sign-up
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="text-xl font-bold ml-2">
            <Logo />
          </Link>
        </div>

        {/* RIGHT: Desktop Menu */}
        <div className="navbar-end hidden lg:flex gap-2 items-center">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/book" className={linkClass("/book")}>
            Book Service
          </Link>

          {/* Admin  */}

          {user && (
            <>
              <Link href="/my-bookings" className={linkClass("/my-bookings")}>
                My Bookings
              </Link>

              <Link href="/profile" className={linkClass("/profile")}>
                My Profile
              </Link>
              <Link href="/admin" className={linkClass("/admin")}>
                Admin
              </Link>

              <button onClick={logout} className="btn btn-sm btn-error">
                Logout
              </button>
            </>
          )}

          {!user && (
            <div className=" flex gap-2">
              <Link href="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link href="/register" className={linkClass("/register")}>
                Sign-up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
