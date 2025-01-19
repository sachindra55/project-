
import { Users, Target, Heart } from 'lucide-react';

export function MissionSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div className="p-6 bg-indigo-50 rounded-lg">
        <Users className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
        <p className="text-gray-600">To provide innovative, accessible nursing education through virtual simulation.</p>
      </div>
      <div className="p-6 bg-indigo-50 rounded-lg">
        <Target className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
        <p className="text-gray-600">To be the leading platform in virtual nursing education worldwide.</p>
      </div>
      <div className="p-6 bg-indigo-50 rounded-lg">
        <Heart className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Our Values</h3>
        <p className="text-gray-600">Excellence, innovation, and student-centered learning.</p>
      </div>
    </div>
  );
}