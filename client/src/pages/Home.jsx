import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  /* ================= HERO SLIDER ================= */

  const heroImages = [
    "https://plus.unsplash.com/premium_photo-1716325052217-1a8aa81b1ae2?q=80&w=870",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f",
  ];

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= TESTIMONIALS ================= */

  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Solar Startup Founder",
      text: "We secured institutional backing within weeks. The AI scoring is incredibly accurate.",
    },
    {
      name: "Emily Chen",
      role: "Climate Researcher",
      text: "Finally a platform that brings transparency to sustainability innovation.",
    },
    {
      name: "Rahul Verma",
      role: "GreenTech Entrepreneur",
      text: "The dashboard insights helped us refine our environmental impact strategy.",
    },
    {
      name: "Sophia Martinez",
      role: "Urban Sustainability Lead",
      text: "A world-class ecosystem for innovators tackling climate change.",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const visibleCards = [
    testimonials[startIndex % testimonials.length],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length],
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-100">
      {/* ================= HERO ================= */}

      <section className="relative h-[90vh] overflow-hidden">
        <img
          key={heroIndex}
          src={heroImages[heroIndex]}
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex flex-col justify-center max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Powering The Future
            <span className="text-green-400"> Through Green Innovation</span>
          </h1>

          <p className="mt-6 text-lg max-w-2xl">
            Submit ideas, receive AI-driven evaluation, collaborate with
            institutions, and transform sustainability into measurable impact.
          </p>

          <div className="flex gap-4 mt-8">
            {!user && (
              <button
                onClick={() => navigate("/register")}
                className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-xl font-semibold shadow-xl transition"
              >
                Get Started 🚀
              </button>
            )}
            {user && (
              <button
                onClick={() => navigate("/submit")}
                className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-xl font-semibold shadow-xl transition"
              >
                Get Started 🚀
              </button>
            )}
            <button
              onClick={() => navigate("/dashboard")}
              className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Explore Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
          <Stat number={10000} label="Ideas Submitted" />
          <Stat number={850} label="Innovators" />
          <Stat number={120} label="Institutions" />
          <Stat number={92} label="Success Rate" />
        </div>
      </section>

      {/* ================= ARTICLES ================= */}

      <section className="py-24 bg-white">
        <h2 className="text-4xl font-bold text-center mb-16">
          Latest Green Insights 🌱
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          <Article
            img="https://d12aarmt01l54a.cloudfront.net/cms/images/UserMedia-20241127185723/808-440.png"
            title="AI is Transforming Climate Innovation"
            desc="Artificial intelligence is accelerating renewable energy optimization worldwide."
          />

          <Article
            img="https://plus.unsplash.com/premium_photo-1714875083318-3fc3ce7d98e0"
            title="Smart Cities Are The Future"
            desc="Urban sustainability is powered by data-driven infrastructure."
          />

          <Article
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReR0ANhOznX47iQIoog_R7BwUbin54c6SGIQ&s"
            title="Solar Adoption Hits Record Levels"
            desc="Solar is now the fastest-growing renewable energy source globally."
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="py-24 bg-green-50">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          <Step
            icon="💡"
            title="Submit Innovation"
            desc="Share sustainability-focused ideas with global institutions."
          />

          <Step
            icon="🤖"
            title="AI Evaluation"
            desc="Advanced algorithms analyze feasibility and environmental impact."
          />

          <Step
            icon="📊"
            title="Track Progress"
            desc="Monitor approvals and bring your innovation to life."
          />
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="py-28 bg-green-50">
        <h2 className="text-4xl font-bold text-center mb-16">
          What Innovators Say
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {visibleCards.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-xl text-center transition hover:scale-105"
            >
              <p className="text-lg italic text-gray-700">"{item.text}"</p>

              <h4 className="mt-6 font-bold text-green-700 text-lg">
                — {item.name}
              </h4>

              <p className="text-gray-500">{item.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="pb-32">
        <div className="max-w-5xl mx-auto text-center bg-gradient-to-r from-green-600 to-emerald-500 text-white p-16 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold">
            Join The Innovation Movement 🌍
          </h2>

          <p className="mt-4 text-green-100">
            Collaborate, innovate, and create lasting environmental impact.
          </p>
          {!user && (
            <button
              onClick={() => navigate("/register")}
              className="mt-8 bg-white text-green-700 px-10 py-3 rounded-2xl font-bold hover:scale-105 transition"
            >
              Create Account
            </button>
          )}
          {user && (
            <button
              onClick={() => navigate("/submit")}
              className="mt-8 bg-white text-green-700 px-10 py-3 rounded-2xl font-bold hover:scale-105 transition"
            >
              Submit Idea
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ number, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += Math.ceil(number / 40);

      if (start >= number) {
        setCount(number);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
  }, [number]);

  return (
    <div className="hover:scale-105 transition">
      <h3 className="text-4xl font-bold text-green-700">{count}+</h3>

      <p className="text-gray-500 mt-2">{label}</p>
    </div>
  );
}

function Step({ icon, title, desc }) {
  return (
    <div className="bg-white p-10 rounded-3xl shadow-md hover:shadow-2xl transition hover:-translate-y-2 text-center">
      <div className="text-4xl mb-4">{icon}</div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>

      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Article({ img, title, desc }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition hover:-translate-y-2">
      <img src={img} className="h-56 w-full object-cover" />

      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{title}</h3>

        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
