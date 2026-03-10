import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function SubmitIdea() {
  const navigate = useNavigate();

  const [idea, setIdea] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/ideas", idea);

      navigate("/dashboard");
    } catch (err) {
      setError("Failed to submit idea");
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
from-green-900/80
to-black/80
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
w-full max-w-2xl
text-white
animate-[fade_0.6s_ease]
"
        >
          <h1 className="text-3xl font-bold mb-2">Submit Your Innovation 🌱</h1>

          <p className="text-gray-200 mb-6">
            Share your sustainable idea and help build a greener future.
          </p>

          {/* ERROR */}

          {error && (
            <p className="bg-red-500/80 p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}

          {/* TITLE */}

          <Input
            label="Innovation Title"
            placeholder="Ex: AI Smart Irrigation System"
            onChange={(e) => setIdea({ ...idea, title: e.target.value })}
          />

          {/* DESCRIPTION */}

          <div className="mb-5">
            <label className="text-sm">Detailed Description</label>

            <textarea
              required
              rows="4"
              onChange={(e) =>
                setIdea({ ...idea, description: e.target.value })
              }
              placeholder="Explain your innovation, its impact, and feasibility..."
              className="
w-full
mt-1
p-3
rounded-xl
bg-white/20
outline-none
focus:ring-2
focus:ring-green-400
resize-none
"
            />
          </div>

          {/* CATEGORY */}

          <div className="mb-5">
            <label className="text-sm">Category</label>

            <select
              required
              onChange={(e) => setIdea({ ...idea, category: e.target.value })}
              className="
w-full
mt-1
p-3
rounded-xl
bg-white/20
outline-none
focus:ring-2
focus:ring-green-400
text-white
"
            >
              <option value="" className="text-black">
                Select Category
              </option>

              <option className="text-black">Renewable Energy</option>

              <option className="text-black">Waste Management</option>

              <option className="text-black">Smart Agriculture</option>

              <option className="text-black">Green Transportation</option>

              <option className="text-black">Climate Tech</option>
            </select>
          </div>

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
            {loading ? "Submitting..." : "Submit Innovation 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */

function Input({ label, placeholder, onChange }) {
  return (
    <div className="mb-5">
      <label className="text-sm">{label}</label>

      <input
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
