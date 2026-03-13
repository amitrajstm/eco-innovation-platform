import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* BACKGROUND IMAGE */}

      <img
        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070"
        alt=""
        className="
absolute
w-full
h-full
object-cover
"
      />

      {/* DARK OVERLAY */}

      <div
        className="
            absolute inset-0
            bg-gradient-to-br
            from-green-900/70
            to-black/70
            "
      />

      {/* LOGIN CARD */}

      <div
        className="
relative z-10
flex items-center justify-center
min-h-screen
px-4
"
      >
        <form
          onSubmit={submit}
          className="
backdrop-blur-xl
bg-white/10
border border-white/20
p-10
rounded-3xl
shadow-2xl animate-[fade_0.6s_ease]
w-full max-w-md
text-white
"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Welcome Back 🌱
          </h1>

          {/* ERROR */}

          {error && (
            <p className="bg-red-500/80 p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}

          {/* EMAIL */}

          <div className="mb-5">
            <label className="text-sm">Email</label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
w-full
mt-1
p-3
rounded-xl
bg-white/20
outline-none
focus:ring-2
focus:ring-green-400
placeholder-gray-200
"
              placeholder="Enter your email"
            />
          </div>

          {/* PASSWORD */}

          <div className="mb-5 relative">
            <label className="text-sm">Password</label>

            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
w-full
mt-1
p-3
rounded-xl
bg-white/20
outline-none
focus:ring-2
focus:ring-green-400
"
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="
absolute
right-3
top-10
text-sm
opacity-80
"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

          {/* REMEMBER + FORGOT */}

          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex gap-2 items-center">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" className="text-green-300 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}

          <button
            disabled={loading}
            className="
w-full
bg-green-500 hover:bg-green-600
p-3
rounded-xl
font-semibold
shadow-lg
transition
disabled:opacity-60
flex justify-center items-center gap-2
"
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* REGISTER */}

          <p className="text-center mt-6 text-sm">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="
ml-2
text-green-300
cursor-pointer
hover:underline
"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
