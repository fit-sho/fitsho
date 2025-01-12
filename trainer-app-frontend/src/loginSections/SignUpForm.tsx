"use client";
import { useState } from "react";
import { registerUser } from "@/utils/userApi";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || age <= 0 || !email || !password) {
      setError("All fields are required. Ensure age is a positive number.");
      return;
    }

    try {
      const { token } = await registerUser(name, email, password, age);
      console.log("Token received:", token); // Debugging line
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <section>
      <div className="min-h-[80vh] flex justify-center items-center pb-16 bg-[radial-gradient(ellipse_250%_100%_at_bottom_right,#183EC2,#EAEEFE_35%)]">
        {/* SignUp Form Box */}
        <div className="rounded-2xl shadow-2xl p-8 md:w-[80%] md:max-w-5xl overflow-hidden">
          {/* Title */}
          <h1 className="section-title mb-6">Sign Up</h1>

          {/* SignUp Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your Age"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Email or Username
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="********"
                required
              />
            </div>

            {/* (Optional) Error Message */}
            {error && (
              <div className="text-red-500 text-sm md:col-span-2">{error}</div>
            )}

            {/* Sign Up Button */}
            <div>
              <button type="submit" className="btn btn-google w-full mt-6">
                Sign Up
              </button>
            </div>

            {/* Sign Up with Google Button */}
            <div>
              <button
                type="button"
                className="btn btn-google w-full mt-6"
                // define handleGoogleSignIn if needed
              >
                Sign Up with Google Account
              </button>
            </div>

            {/* Already have an account? */}
            <div className="md:col-span-2">
              <p className="mt-4">
                <a href="/login" className="underline">
                  Already have an account? Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
