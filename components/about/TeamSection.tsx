
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Dr. ABC',
    role: 'Program Director',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&q=80',
  },
  {
    name: 'Prof. ABC',
    role: 'Lead Instructor',
    image: '',
  },
  {
    name: 'Dr. ABC',
    role: 'Clinical Coordinator',
    image: '',
  },
];

export function TeamSection() {
  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Meet Our <span className="text-blue-600">Expert Team</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {teamMembers.map((member) => (
          <div key={member.name} 
               className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 transform -skew-y-12 group-hover:skew-y-12 transition-all duration-1000 opacity-75"></div>
            <img
              src={member.image || 'default-avatar.png'}
              alt={member.name}
              className="relative w-full h-64 object-cover"
            />
            <div className="relative p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
              <p className="text-blue-600 font-medium">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}