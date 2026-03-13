import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  /* ================= FETCH ================= */

  const fetchIdeas = async () => {
    try {
      const res = await api.get("/ideas");
      setIdeas(res.data);
      setFiltered(res.data);
    } catch {
      console.log("Failed to load ideas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  /* ================= FILTER ================= */

  useEffect(() => {
    let temp = ideas;

    if (search) {
      temp = temp.filter((i) =>
        i.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      temp = temp.filter((i) => i.status === statusFilter);
    }

    setFiltered(temp);
  }, [search, statusFilter, ideas]);

  /* ================= ACTIONS ================= */

  const approveIdea = async (id) => {
    await api.patch(`/ideas/${id}/approve`);
    fetchIdeas();
  };

  const rejectIdea = async (id) => {
    await api.patch(`/ideas/${id}/reject`);
    fetchIdeas();
  };

  const voteIdea = async (id) => {
    await api.patch(`/ideas/${id}/vote`);
    fetchIdeas();
  };

  /* ================= STATS ================= */

  const total = ideas.length;
  const approved = ideas.filter((i) => i.status === "approved").length;
  const pending = ideas.filter((i) => i.status === "pending").length;
  const rejected = ideas.filter((i) => i.status === "rejected").length;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-50 to-green-50">

      {/* ================= SIDEBAR ================= */}

      <aside className="w-full lg:w-72 bg-gradient-to-b from-emerald-900 to-emerald-700 text-white p-6 lg:p-8 flex lg:flex-col justify-between shadow-2xl">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-12">
            EcoNexus 🌱
          </h1>

          <nav className="flex flex-col gap-2">
            <NavButton label="Home" onClick={() => navigate("/")} />
            <NavButton label="Submit Idea" onClick={() => navigate("/submit")} />
            <NavButton label="Core Team" onClick={() => navigate("/ourteam")} />
          </nav>
        </div>

        <div className="mt-6 lg:mt-auto">
          <div className="bg-white/10 p-3 rounded-xl mb-3">
            <p className="text-sm opacity-80">Logged in as</p>
            <p className="font-semibold capitalize">{user?.role}</p>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main className="flex-1 p-5 sm:p-6 lg:p-10">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
              Innovation Dashboard
            </h2>

            <p className="text-gray-500">Welcome back {user?.name}</p>
          </div>

          <button
            onClick={() => navigate("/submit")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-lg transition"
          >
            + Submit Innovation
          </button>
        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <Stat title="Total Ideas" value={total} icon="💡" />
          <Stat title="Approved" value={approved} icon="✅" />
          <Stat title="Pending" value={pending} icon="⏳" />
          <Stat title="Rejected" value={rejected} icon="❌" />
        </div>

        {/* ================= FILTER ================= */}

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            placeholder="Search innovations..."
            className="flex-1 bg-white p-2.5 sm:p-3 rounded-xl shadow focus:ring-2 focus:ring-emerald-500 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="bg-white p-2.5 sm:p-3 rounded-xl shadow focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* ================= LOADING ================= */}

        {loading && <SkeletonGrid />}

        {/* ================= EMPTY ================= */}

        {!loading && filtered.length === 0 && (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">No Ideas Yet</h3>

            <p className="text-gray-500 mb-6">
              Start by submitting your first innovation.
            </p>

            <button
              onClick={() => navigate("/submit")}
              className="bg-emerald-600 text-white px-6 py-2 rounded-xl"
            >
              Submit Idea
            </button>
          </div>
        )}

        {/* ================= GRID ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((i) => (
            <IdeaCard
              key={i._id}
              idea={i}
              voteIdea={voteIdea}
              approveIdea={approveIdea}
              rejectIdea={rejectIdea}
              user={user}
            />
          ))}
        </div>

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left p-3 rounded-xl hover:bg-white/10 transition"
    >
      {label}
    </button>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition flex items-center gap-4">
      <div className="text-2xl sm:text-3xl">{icon}</div>

      <div>
        <p className="text-gray-500 text-sm sm:text-base">{title}</p>
        <h2 className="text-xl sm:text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

function IdeaCard({ idea, voteIdea, approveIdea, rejectIdea, user }) {
  const styles = {
    approved: "bg-green-600",
    pending: "bg-yellow-500",
    rejected: "bg-red-500",
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-2xl transition">
      <h3 className="text-lg sm:text-xl font-bold mb-2">{idea.title}</h3>

      <p className="text-gray-600 mb-4">{idea.description}</p>

      <div className="flex justify-between mb-4">
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold text-sm">
          AI Score: {idea.aiScore}
        </span>

        <span
          className={`${styles[idea.status]} text-white px-3 py-1 rounded-full text-sm capitalize`}
        >
          {idea.status}
        </span>
      </div>

      <button
        onClick={() => voteIdea(idea._id)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl mb-2"
      >
        👍 Vote
      </button>

      {user?.role === "admin" && (
        <div className="flex gap-2">
          <button
            onClick={() => approveIdea(idea._id)}
            className="flex-1 bg-emerald-600 text-white py-2 rounded-xl"
          >
            Approve
          </button>

          <button
            onClick={() => rejectIdea(idea._id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-xl"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-52 bg-gray-200 animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}


// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useAuth } from "../auth/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [ideas, setIdeas] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   /* ================= FETCH ================= */

//   const fetchIdeas = async () => {
//     try {
//       const res = await api.get("/ideas");

//       setIdeas(res.data);
//       setFiltered(res.data);
//     } catch {
//       console.log("Failed to load ideas");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIdeas();
//   }, []);

//   /* ================= FILTER ================= */

//   useEffect(() => {
//     let temp = ideas;

//     if (search) {
//       temp = temp.filter((i) =>
//         i.title.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     if (statusFilter !== "all") {
//       temp = temp.filter((i) => i.status === statusFilter);
//     }

//     setFiltered(temp);
//   }, [search, statusFilter, ideas]);

//   /* ================= ACTIONS ================= */

//   const approveIdea = async (id) => {
//     await api.patch(`/ideas/${id}/approve`);
//     fetchIdeas();
//   };

//   const rejectIdea = async (id) => {
//     await api.patch(`/ideas/${id}/reject`);
//     fetchIdeas();
//   };

//   const voteIdea = async (id) => {
//     await api.patch(`/ideas/${id}/vote`);
//     fetchIdeas();
//   };

//   /* ================= STATS ================= */

//   const total = ideas.length;
//   const approved = ideas.filter((i) => i.status === "approved").length;
//   const pending = ideas.filter((i) => i.status === "pending").length;
//   const rejected = ideas.filter((i) => i.status === "rejected").length;

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
//       {/* ================= SIDEBAR ================= */}

//       <aside
//         className="
// w-72
// bg-gradient-to-b
// from-emerald-900
// to-emerald-700
// text-white
// p-8
// flex flex-col
// shadow-2xl
// "
//       >
//         <h1 className="text-3xl font-bold mb-12">EcoNexus 🌱</h1>

//         <nav className="flex flex-col gap-3">
//           <NavButton label="Home" onClick={() => navigate("/")} />
//           <NavButton label="Submit Idea" onClick={() => navigate("/submit")} />
//           <NavButton label="Core Team" onClick={() => navigate("/ourteam")} />
//         </nav>

//         <div className="mt-auto">
//           <div
//             className="
// bg-white/10
// p-4
// rounded-xl
// mb-4
// "
//           >
//             <p className="text-sm opacity-80">Logged in as</p>
//             <p className="font-semibold capitalize">{user?.role}</p>
//           </div>

//           <button
//             onClick={logout}
//             className="
// w-full
// bg-red-500
// hover:bg-red-600
// py-2
// rounded-lg
// transition
// "
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* ================= MAIN ================= */}

//       <main className="flex-1 p-10">
//         {/* HEADER */}

//         <div className="flex justify-between items-center mb-12">
//           <div>
//             <h2 className="text-4xl font-bold text-slate-800">
//               Innovation Dashboard
//             </h2>

//             <p className="text-gray-500">Welcome back {user?.name}</p>
//           </div>

//           <button
//             onClick={() => navigate("/submit")}
//             className="
// bg-emerald-600
// hover:bg-emerald-700
// text-white
// px-6 py-3
// rounded-xl
// shadow-lg
// hover:shadow-2xl
// transition
// "
//           >
//             + Submit Innovation
//           </button>
//         </div>

//         {/* ================= STATS ================= */}

//         <div className="grid md:grid-cols-4 gap-6 mb-12">
//           <Stat title="Total Ideas" value={total} icon="💡" />
//           <Stat title="Approved" value={approved} icon="✅" />
//           <Stat title="Pending" value={pending} icon="⏳" />
//           <Stat title="Rejected" value={rejected} icon="❌" />
//         </div>

//         {/* ================= FILTER ================= */}

//         <div className="flex gap-4 mb-10">
//           <input
//             placeholder="Search innovations..."
//             className="
// flex-1
// bg-white
// p-3
// rounded-xl
// shadow
// focus:ring-2
// focus:ring-emerald-500
// outline-none
// "
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select
//             className="
// bg-white
// p-3
// rounded-xl
// shadow
// focus:ring-2
// focus:ring-emerald-500
// "
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="all">All</option>
//             <option value="approved">Approved</option>
//             <option value="pending">Pending</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>

//         {/* ================= LOADING ================= */}

//         {loading && <SkeletonGrid />}

//         {/* ================= EMPTY ================= */}

//         {!loading && filtered.length === 0 && (
//           <div
//             className="
// bg-white
// p-12
// rounded-2xl
// shadow
// text-center
// "
//           >
//             <h3 className="text-2xl font-bold mb-2">No Ideas Yet</h3>

//             <p className="text-gray-500 mb-6">
//               Start by submitting your first innovation.
//             </p>

//             <button
//               onClick={() => navigate("/submit")}
//               className="
// bg-emerald-600
// text-white
// px-6 py-2
// rounded-xl
// "
//             >
//               Submit Idea
//             </button>
//           </div>
//         )}

//         {/* ================= GRID ================= */}

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filtered.map((i) => (
//             <IdeaCard
//               key={i._id}
//               idea={i}
//               voteIdea={voteIdea}
//               approveIdea={approveIdea}
//               rejectIdea={rejectIdea}
//               user={user}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function NavButton({ label, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="
// text-left
// p-3
// rounded-xl
// hover:bg-white/10
// transition
// "
//     >
//       {label}
//     </button>
//   );
// }

// function Stat({ title, value, icon }) {
//   return (
//     <div
//       className="
// bg-white
// p-6
// rounded-2xl
// shadow
// hover:shadow-xl
// transition
// flex items-center gap-4
// "
//     >
//       <div className="text-3xl">{icon}</div>

//       <div>
//         <p className="text-gray-500">{title}</p>
//         <h2 className="text-3xl font-bold">{value}</h2>
//       </div>
//     </div>
//   );
// }

// function IdeaCard({ idea, voteIdea, approveIdea, rejectIdea, user }) {
//   const styles = {
//     approved: "bg-green-600",
//     pending: "bg-yellow-500",
//     rejected: "bg-red-500",
//   };

//   return (
//     <div
//       className="
// bg-white
// p-6
// rounded-2xl
// shadow-md
// hover:shadow-2xl
// transition
// hover:-translate-y-1
// "
//     >
//       <h3 className="text-xl font-bold mb-2">{idea.title}</h3>

//       <p className="text-gray-600 mb-4">{idea.description}</p>

//       <div className="flex justify-between mb-4">
//         <span
//           className="
// bg-emerald-100
// text-emerald-700
// px-3 py-1
// rounded-full
// font-semibold
// text-sm
// "
//         >
//           AI Score: {idea.aiScore}
//         </span>

//         <span
//           className={`
// ${styles[idea.status]}
// text-white
// px-3 py-1
// rounded-full
// text-sm
// capitalize
// `}
//         >
//           {idea.status}
//         </span>
//       </div>

//       <button
//         onClick={() => voteIdea(idea._username)}
//         className=" w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl mb-2 "
//       >
//         {" "}
//         👍 Vote{" "}
//       </button>

//       {user?.role === "admin" && (
//         <div className="flex gap-2">
//           <button
//             onClick={() => approveIdea(idea._id)}
//             className="
// flex-1
// bg-emerald-600
// text-white
// py-2
// rounded-xl
// "
//           >
//             Approve
//           </button>

//           <button
//             onClick={() => rejectIdea(idea._id)}
//             className="
// flex-1
// bg-red-500
// text-white
// py-2
// rounded-xl
// "
//           >
//             Reject
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// function SkeletonGrid() {
//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {[...Array(6)].map((_, i) => (
//         <div
//           key={i}
//           className="
// h-52
// bg-gray-200
// animate-pulse
// rounded-2xl
// "
//         />
//       ))}
//     </div>
//   );
// }
