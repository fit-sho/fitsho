"use client";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  // All users will be clients by default
  const role = "client";

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Now the user is truly logged in (email confirmed or auto-login). 
        // Insert into `public.users` with RLS allowing auth.uid() = id.
        insertProfile(session.user.id, session.user.email!);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [firstName, lastName, router]);

  // Called by the effect above once the user is signed in.
  async function insertProfile(userId: string, userEmail: string) {
    // Only insert once
    try {
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .maybeSingle();
        
      if (checkError) {
        throw checkError;
      }
      
      // If user already exists, don't create a new record
      if (existingUser) {
        router.push('/');
        return;
      }
      
      // Insert new user with client role
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            email: userEmail,
            first_name: firstName,
            last_name: lastName,
            role: "client", // Default role is client
          },
        ]);

      if (insertError) {
        setErrorMsg(`Profile insert failed: ${insertError.message}`);
      } else {
        // Redirect after successful profile creation
        router.push('/');
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    }
    setLoading(false);
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();
    
    if (existingUser) {
      setErrorMsg('An account with this email already exists. Please use a different email or log in.');
      setLoading(false);
      return;
    }
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      // Handle specific auth errors
      if (authError.message.includes('User already registered')) {
        setErrorMsg('An account with this email already exists. Please use a different email or log in.');
      } else {
        setErrorMsg(authError.message);
      }
      setLoading(false);
      return;
    }
    setSuccessMsg(
      'Check your email for a confirmation link. Once confirmed, your profile will be created automatically.'
    );
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing Up…" : "Sign Up"}
          </button>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-600 text-sm text-center">{successMsg}</p>
          )}
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}