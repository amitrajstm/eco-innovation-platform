import React from "react";

export default function OurTeam() {
  const team = [
   
    {
      name: "Subhendra",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/men/30.jpg",
      desc: "Designs clean and user-friendly interfaces to help innovators easily submit, track, and manage sustainable ideas on the platform.",
    },
     {
      name: "Amit Raj",
      role: "Founder & Full Stack Developer",
      image: "https://avatars.githubusercontent.com/u/170423200?s=400&u=aaa6acdb359367af4650b45ebd64091c339749bc&v=4",
      desc: "Passionate about building green innovation platforms and scalable web applications.",
    },
    {
      name: "Anshu Kumar",
      role: "AI & Innovation Analyst",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      desc: "Develops AI-based evaluation models that analyze innovation feasibility, sustainability impact, and scoring for submitted ideas.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}

        <h2 className="text-4xl font-bold text-center mb-4">
          Meet Our Team 🌱
        </h2>

        <p className="text-center text-gray-500 mb-16">
          The passionate innovators behind EcoNexus platform
        </p>

        {/* Team Grid */}

        <div className="grid md:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
              text-center
              hover:shadow-2xl
              transition
              hover:-translate-y-2
              "
            >
              {/* Photo */}

              <img
                src={member.image}
                alt={member.name}
                className="
                w-32
                h-32
                mx-auto
                rounded-full
                object-cover
                border-4
                border-green-200
                mb-6
                "
              />

              {/* Name */}

              <h3 className="text-xl font-bold mb-1">{member.name}</h3>

              {/* Role */}

              <p className="text-green-600 font-semibold mb-3">{member.role}</p>

              {/* Description */}

              <p className="text-gray-500 text-sm">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
