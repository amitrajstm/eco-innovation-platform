import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
      sticky top-0 z-50
      backdrop-blur-lg
      bg-white/70
      border-b
    "
    >
      <div
        className="
        max-w-7xl mx-auto
        flex justify-between items-center
        px-6 py-4
      "
      >
        {/* LOGO */}

        <h1
          onClick={() => navigate("/")}
          className="
            text-2xl font-bold
            text-emerald-700
            cursor-pointer
          "
        >
          🌱 EcoNexus
        </h1>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex gap-6 items-center">
          <button
            onClick={() => navigate("/")}
            className="hover:text-emerald-600 font-medium"
          >
            Home
          </button>

          {user && (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="hover:text-emerald-600 font-medium"
              >
                Dashboard
              </button>

              <button
                onClick={() => navigate("/submit")}
                className="hover:text-emerald-600 font-medium"
              >
                Submit Idea
              </button>
            </>
          )}

          {/* AUTH BUTTONS */}

          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="font-semibold hover:text-emerald-700"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="
                  bg-emerald-600 hover:bg-emerald-700
                  text-white px-5 py-2
                  rounded-xl
                  shadow-md hover:shadow-xl
                  transition
                "
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="
                bg-red-500 hover:bg-red-600
                text-white px-4 py-2
                rounded-xl
              "
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE BUTTON */}

        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <button onClick={() => navigate("/")}>Home</button>

          {user && (
            <>
              <button onClick={() => navigate("/dashboard")}>Dashboard</button>

              <button onClick={() => navigate("/submit")}>Submit Idea</button>
            </>
          )}

          {!user ? (
            <>
              <button onClick={() => navigate("/login")}>Login</button>

              <button
                onClick={() => navigate("/register")}
                className="bg-emerald-600 text-white py-2 rounded-lg"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
