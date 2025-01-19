import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Stethoscope, Syringe, Thermometer, Activity, Brain } from 'lucide-react';

interface SkillCard {
  title: string;
  description: string;
  icon: React.ElementType;
  level: string;
  duration: string;
  category: string;
  path?: string;
}

const skillCards: SkillCard[] = [
  {
    title: "Vital Signs Assessment",
    description: "Learn to accurately measure and interpret vital signs including blood pressure, pulse, respiration, and temperature.",
    icon: Activity,
    level: "Beginner",
    duration: "45 mins",
    category: "Clinical Skills",
    path: "/skills-training/vital-signs"
  },
  {
    title: "Cardiac Assessment",
    description: "Master the techniques of heart sound auscultation and ECG interpretation.",
    icon: Heart,
    level: "Intermediate",
    duration: "60 mins",
    category: "Specialized Skills"
  },
  {
    title: "Injection Techniques",
    description: "Practice proper techniques for intramuscular, subcutaneous, and intradermal injections.",
    icon: Syringe,
    level: "Beginner",
    duration: "30 mins",
    category: "Clinical Skills"
  },
  {
    title: "Physical Assessment",
    description: "Learn comprehensive head-to-toe physical assessment techniques.",
    icon: Stethoscope,
    level: "Advanced",
    duration: "90 mins",
    category: "Clinical Skills"
  },
  {
    title: "Temperature Management",
    description: "Learn various methods of measuring body temperature and managing fever.",
    icon: Thermometer,
    level: "Beginner",
    duration: "30 mins",
    category: "Clinical Skills"
  },
  {
    title: "Neurological Assessment",
    description: "Master the techniques for assessing neurological function and consciousness levels.",
    icon: Brain,
    level: "Advanced",
    duration: "75 mins",
    category: "Specialized Skills"
  }
];

export function VirtualSkillsTrainingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-400 via-purple-500 to-indigo-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Virtual Skills Training</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Master essential nursing skills through interactive tutorials and virtual practice sessions
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {skillCards.map((skill, index) => (
            skill.path ? (
              <Link
                key={index}
                to={skill.path}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-500 hover:scale-105 group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg">
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm">
                    {skill.level}
                  </span>
                </div>

                {/* Card Content */}
                <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
                <p className="text-white/80 mb-4 h-24">{skill.description}</p>

                {/* Card Footer */}
                <div className="flex items-center justify-between text-white/70 text-sm">
                  <span>{skill.category}</span>
                  <span>{skill.duration}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </Link>
            ) : (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-500 hover:scale-105 group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg">
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm">
                    {skill.level}
                  </span>
                </div>

                {/* Card Content */}
                <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
                <p className="text-white/80 mb-4 h-24">{skill.description}</p>

                {/* Card Footer */}
                <div className="flex items-center justify-between text-white/70 text-sm">
                  <span>{skill.category}</span>
                  <span>{skill.duration}</span>
                </div>

                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                    Coming Soon
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </div>
            )
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="text-center">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-xl mb-4">
            <p className="text-white/90">More skills and specializations coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
