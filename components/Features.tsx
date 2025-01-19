import React from 'react';
import { Users, Brain, BookOpen, Activity } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
}

const features: Feature[] = [
  {
    title: 'Virtual Community Learning',
    description: 'Engage with realistic patient scenarios in our virtual town setting.',
    icon: Users,
    bgColor: 'bg-purple-100'
  },
  {
    title: 'Clinical Reasoning Development',
    description: 'Enhance your decision-making skills through interactive case studies.',
    icon: Brain,
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Comprehensive Resources',
    description: 'Access a wide range of learning materials and assessment tools.',
    icon: BookOpen,
    bgColor: 'bg-green-100'
  },
  {
    title: 'Real-time Progress Tracking',
    description: 'Monitor your learning journey with detailed progress analytics.',
    icon: Activity,
    bgColor: 'bg-yellow-100'
  },
];

export function Features() {
  return (
    <div className="py-16 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Learn Nursing Like Never Before
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} 
                   className={`relative group p-6 ${feature.bgColor} rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <feature.icon className="h-8 w-8 mb-4 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}