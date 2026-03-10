import { useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-gray-400">
      <div
        className="
max-w-7xl mx-auto
px-6
py-16
grid md:grid-cols-4
gap-10
"
      >
        {/* BRAND */}

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            🌱 Green Innovation
          </h2>

          <p className="text-sm leading-relaxed">
            Empowering innovators and institutions to build a sustainable future
            through AI-driven collaboration.
          </p>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2">
            <li
              className="hover:text-white cursor-pointer transition"
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className="hover:text-white cursor-pointer transition"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </li>

            <li
              className="hover:text-white cursor-pointer transition"
              onClick={() => navigate("/submit")}
            >
              Submit Idea
            </li>
            <li
              className="hover:text-white cursor-pointer transition"
              onClick={() => navigate("/ourteam")}
            >
              Meet Our Team
            </li>
          </ul>
        </div>

        {/* PLATFORM */}

        <div>
          <h3 className="text-white font-semibold mb-4">Platform</h3>

          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer transition">
              AI Evaluation
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Innovation Tracking
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Institutional Access
            </li>
          </ul>
        </div>

        {/* CONTACT */}

        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2 text-gray-300">
              <FaEnvelope className="text-green-400" />
              <a
                href="mailto:rajamitstm@gmail.com"
                className="hover:text-green-400 transition"
              >
                rajamitstm@gmail.com
              </a>
            </p>

            <p className="flex items-center gap-2 text-gray-300">
              <FaPhoneAlt className="text-green-400" />
              <a
                href="tel:+917091132000"
                className="hover:text-green-400 transition"
              >
                +91-7091132xxx
              </a>
            </p>
          </div>
          <div className="flex justify-center gap-5 mt-6">
            <a
              href="https://amitkumarraj.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="
    w-11 h-11
    flex items-center justify-center
    rounded-full
    bg-white
    text-gray-700
    shadow-md
    hover:bg-green-500
    hover:text-white
    hover:scale-110
    transition-all
    duration-300
    "
            >
              <FaGlobe size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/amitkumarraj-stm/"
              target="_blank"
              rel="noopener noreferrer"
              className="
    w-11 h-11
    flex items-center justify-center
    rounded-full
    bg-white
    text-gray-700
    shadow-md
    hover:bg-blue-600
    hover:text-white
    hover:scale-110
    transition-all
    duration-300
    "
            >
              <FaLinkedin size={18} />
            </a>

            <a
              href="https://github.com/amitrajstm"
              target="_blank"
              rel="noopener noreferrer"
              className="
    w-11 h-11
    flex items-center justify-center
    rounded-full
    bg-white
    text-gray-700
    shadow-md
    hover:bg-black
    hover:text-white
    hover:scale-110
    transition-all
    duration-300
    "
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}

      <div
        className="
border-t border-slate-700
text-center
py-6
text-sm
"
      >
        © {new Date().getFullYear()} Digital Green Innovation Portal All rights
        reserved.
      </div>
    </footer>
  );
}
