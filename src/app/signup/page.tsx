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
  const [role, setRole] = useState<"client" | "trainer">("client");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
  }, [firstName, lastName, role, router]);

  // Called by the effect above once the user is signed in.
  async function insertProfile(userId: string, userEmail: string) {
    // Only insert once
    try {
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            email: userEmail,
            first_name: firstName,
            last_name: lastName,
            role,
          },
        ]);

      if (insertError) {
        setErrorMsg(`Profile insert failed: ${insertError.message}`);
      } else {
        // Redirect after successful profile creation
        router.push('/login');
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    }
    setLoading(false);
  }

  const handleGoogleSignUp = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    
    // Store form data in localStorage to retrieve after OAuth flow
    localStorage.setItem('signupData', JSON.stringify({
      firstName,
      lastName,
      role,
    }));
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };
  
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

    // Trigger Supabase Auth sign-up. 
    // Because we have email confirmation ON by default, this does NOT immediately log in.
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

    // Tell the user to confirm email (or that they will be signed in automatically if confirmations are off)
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

          <div>
            <label className="block text-sm font-medium">I am a:</label>
            <div className="mt-1 flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={role === "client"}
                  onChange={() => setRole("client")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span>Client</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="trainer"
                  checked={role === "trainer"}
                  onChange={() => setRole("trainer")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span>Trainer</span>
              </label>
            </div>
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
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
              <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
              <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
            </svg>
            <span>Sign up with Google</span>
          </button>
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
