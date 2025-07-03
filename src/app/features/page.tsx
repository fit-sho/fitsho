"use client";
import Image from "next/image";
import Link from "next/link";

// Feature card component
const FeatureCard = ({ 
  title, 
  description, 
  icon,
  color = "bg-indigo-500"
}: { 
  title: string; 
  description: string;
  icon: React.ReactNode;
  color?: string;
}) => (
  <div className="rounded-lg shadow-lg overflow-hidden">
    <div className={`p-6 ${color} text-white`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="text-white">{icon}</div>
      </div>
      <p className="text-white/90">{description}</p>
    </div>
    <div className="bg-white p-4">
      <Link href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
        Learn more <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  </div>
);

// Testimonial component
const Testimonial = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <svg className="h-8 w-8 text-gray-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
    <p className="text-gray-600 mb-4">{quote}</p>
    <div>
      <p className="font-bold">{author}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);

export default function FeaturesPage() {
  // Feature icons
  const WorkoutIcon = () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
  );
  
  const ExerciseIcon = () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
    </svg>
  );
  
  const TemplateIcon = () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
    </svg>
  );
  
  const ProgressIcon = () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h9a1 1 0 100-2H3zm0 6a1 1 0 100 2h5a1 1 0 100-2H3z" clipRule="evenodd"></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Fitness Professionals and Enthusiasts
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Our comprehensive fitness platform helps trainers manage clients and workout plans
            while enabling fitness enthusiasts to track their progress effectively.
          </p>
          <div className="mt-10">
            <Link href="/signup" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4">
              Get Started Free
            </Link>
            <Link href="/demo" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Features grid */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              title="Exercise Library" 
              description="Access a comprehensive database of exercises with descriptions and video demonstrations to build effective workout routines."
              icon={<ExerciseIcon />}
              color="bg-blue-500"
            />
            
            <FeatureCard 
              title="Workout Templates" 
              description="Create and save customized workout templates with specific exercises, sets, and reps for quick assignment to clients."
              icon={<TemplateIcon />}
              color="bg-indigo-500"
            />
            
            <FeatureCard 
              title="Progress Tracking" 
              description="Monitor workout completion, track performance metrics, and visualize improvements over time with detailed analytics."
              icon={<ProgressIcon />}
              color="bg-purple-500"
            />
            
            <FeatureCard 
              title="Client Management" 
              description="Efficiently manage client relationships, assign personalized workouts, and provide feedback on their performance."
              icon={<WorkoutIcon />}
              color="bg-green-500"
            />
          </div>
        </div>
        
        {/* How it works section */}
        <div className="py-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Workouts</h3>
              <p className="text-gray-600">Build custom workout templates with exercises, sets, and reps tailored to specific goals.</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Assign to Clients</h3>
              <p className="text-gray-600">Quickly assign workout plans to clients or schedule them for yourself.</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor completion, track performance metrics, and visualize improvements over time.</p>
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="py-16 border-t border-gray-200">
          <div className="bg-indigo-700 rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Ready to elevate your fitness journey?
                </h2>
                <p className="mt-2 md:mt-4 text-lg text-indigo-100">
                  Join thousands of trainers and fitness enthusiasts today.
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Link href="/signup" className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}