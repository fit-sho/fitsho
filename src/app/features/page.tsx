"use client";
import Image from "next/image";
import Link from "next/link";

// Feature card component
const FeatureCard = ({
  title,
  description,
  icon,
  color = "bg-indigo-500",
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
}) => (
  <div className="overflow-hidden rounded-lg shadow-lg">
    <div className={`p-6 ${color} text-white`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="text-white">{icon}</div>
      </div>
      <p className="text-white/90">{description}</p>
    </div>
    <div className="bg-white p-4">
      <Link
        href="#"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        Learn more <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  </div>
);

// Testimonial component
const Testimonial = ({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) => (
  <div className="rounded-lg bg-white p-6 shadow-md">
    <svg
      className="mb-4 h-8 w-8 text-gray-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
    <p className="mb-4 text-gray-600">{quote}</p>
    <div>
      <p className="font-bold">{author}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);

export default function FeaturesPage() {
  // Feature icons
  const WorkoutIcon = () => (
    <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const ExerciseIcon = () => (
    <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const TemplateIcon = () => (
    <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
      <path
        fillRule="evenodd"
        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const ProgressIcon = () => (
    <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h9a1 1 0 100-2H3zm0 6a1 1 0 100 2h5a1 1 0 100-2H3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="py-16 text-center md:py-24">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Powerful Features for Fitness Professionals and Enthusiasts
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Our comprehensive fitness platform helps trainers manage clients and
            workout plans while enabling fitness enthusiasts to track their
            progress effectively.
          </p>
          <div className="mt-10">
            <Link
              href="/signup"
              className="mr-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Features grid */}
        <div className="py-12">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
        <div className="border-t border-gray-200 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            How It Works
          </h2>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Create Workouts</h3>
              <p className="text-gray-600">
                Build custom workout templates with exercises, sets, and reps
                tailored to specific goals.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Assign to Clients</h3>
              <p className="text-gray-600">
                Quickly assign workout plans to clients or schedule them for
                yourself.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Track Progress</h3>
              <p className="text-gray-600">
                Monitor completion, track performance metrics, and visualize
                improvements over time.
              </p>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="border-t border-gray-200 py-16">
          <div className="overflow-hidden rounded-xl bg-indigo-700 shadow-xl">
            <div className="px-6 py-12 text-center md:flex md:items-center md:justify-between md:p-12 md:text-left">
              <div>
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Ready to elevate your fitness journey?
                </h2>
                <p className="mt-2 text-lg text-indigo-100 md:mt-4">
                  Join thousands of trainers and fitness enthusiasts today.
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Link
                  href="/signup"
                  className="inline-block rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
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
