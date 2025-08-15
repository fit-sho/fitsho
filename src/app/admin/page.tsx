"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient, User } from "@/lib/client-auth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const currentUser = await authClient.getCurrentUser();

        if (!currentUser) {
          router.push("/login");
          return;
        }

        // Check if user has admin role
        if (currentUser.role !== "ADMIN") {
          setError("Access denied. Admin privileges required.");
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Admin auth error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="mx-auto mb-4 h-32 w-32 animate-spin rounded-full border-b-2 border-cyan-400"></div>
          <p className="text-gray-400">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="max-w-md rounded-lg border border-red-500 bg-red-500/20 p-6">
            <h2 className="mb-2 text-xl font-bold text-red-400">
              Access Denied
            </h2>
            <p className="mb-4 text-gray-300">{error}</p>
            <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <AdminDashboard />;
}
