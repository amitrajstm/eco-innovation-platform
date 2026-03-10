import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* BACKGROUND */}

      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2070"
        alt=""
        className="absolute w-full h-full object-cover"
      />

      <div
        className="
absolute inset-0
bg-gradient-to-br
from-green-900/70
to-black/70
"
      />

      {/* FORM */}

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
shadow-2xl
w-full max-w-md
text-white
animate-[fade_0.6s_ease]
"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create Account 🌱
          </h1>

          {/* ERROR */}

          {error && (
            <p className="bg-red-500/80 p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}

          {/* NAME */}

          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* EMAIL */}

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* PASSWORD */}

          <div className="relative">
            <Input
              label="Password"
              type={show ? "text" : "password"}
              placeholder="Create password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-10 text-sm"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

          {/* CONFIRM */}

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />

          {/* BUTTON */}

          <button
            disabled={loading}
            className="
w-full
mt-6
bg-green-500 hover:bg-green-600
p-3
rounded-xl
font-semibold
shadow-lg
transition
"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          {/* LOGIN */}

          <p className="text-center mt-6 text-sm">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="
ml-2
text-green-300
cursor-pointer
hover:underline
"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */

function Input({ label, type, placeholder, onChange }) {
  return (
    <div className="mb-5">
      <label className="text-sm">{label}</label>

      <input
        type={type}
        required
        onChange={onChange}
        placeholder={placeholder}
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
      />
    </div>
  );
}
