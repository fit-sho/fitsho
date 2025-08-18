"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient, User } from "@/lib/client-auth";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  Calendar,
  Ruler,
  Weight,
  Users,
  Save,
  Edit3,
  Check,
  Shield,
} from "lucide-react";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  sex: string;
}

interface ProfileFormErrors {
  firstName?: string;
  lastName?: string;
  age?: string;
  height?: string;
  weight?: string;
  sex?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    age: 0,
    height: 0,
    weight: 0,
    sex: "",
  });
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authClient.getCurrentUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }
        setUser(currentUser);
        setFormData({
          firstName: currentUser.firstName || "",
          lastName: currentUser.lastName || "",
          age: (currentUser as any).age || 0,
          height: (currentUser as any).height || 0,
          weight: (currentUser as any).weight || 0,
          sex: (currentUser as any).sex || "",
        });
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const validateForm = (): boolean => {
    const newErrors: ProfileFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (formData.age && (formData.age < 13 || formData.age > 120)) {
      newErrors.age = "Age must be between 13 and 120";
    }

    if (formData.height && (formData.height < 100 || formData.height > 250)) {
      newErrors.height = "Height must be between 100 and 250 cm";
    }

    if (formData.weight && (formData.weight < 30 || formData.weight > 300)) {
      newErrors.weight = "Weight must be between 30 and 300 kg";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSuccessMessage("Profile updated successfully!");
      const updatedUser = await authClient.getCurrentUser();
      setUser(updatedUser);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ firstName: "Failed to update profile. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof ProfileFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  if (loading) {
    return (
      <div className="animated-bg">
        <div className="animated-bg-overlay"></div>
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
        <div className="animated-bg-content flex min-h-screen items-center justify-center">
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-cyan-400"></div>
            <p className="text-lg text-white/80">Loading your profile...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="animated-bg">
      <div className="animated-bg-overlay"></div>
      <div className="floating-particles">
        {[
          { left: 15, top: 20 },
          { left: 85, top: 30 },
          { left: 25, top: 60 },
          { left: 70, top: 15 },
          { left: 45, top: 80 },
          { left: 90, top: 70 },
          { left: 10, top: 45 },
          { left: 60, top: 90 },
        ].map((position, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="animated-bg-content">
        <motion.div
          className="relative overflow-hidden pb-12 pt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </span>
                </div>
              </motion.div>
              <motion.h1
                className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Profile{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Settings
                </span>
              </motion.h1>
              <motion.p
                className="mb-8 text-xl text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Manage your personal information and preferences
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.main
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
            <motion.div
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">
                  <span className="text-2xl font-bold text-white">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </span>
                </div>
                <h2 className="mb-1 text-lg font-bold text-white">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="mb-3 flex items-center justify-center text-sm text-white/70">
                  <Mail className="mr-2 h-4 w-4" />
                  {user.email}
                </p>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/20 px-3 py-1 text-xs font-medium capitalize text-white backdrop-blur-sm">
                  <Shield className="mr-1 h-3 w-3" />
                  {user.role.toLowerCase()}
                </span>
              </div>
              <div className="mt-6 border-t border-white/20 pt-6">
                <h3 className="mb-4 flex items-center text-sm font-semibold text-white">
                  <UserIcon className="mr-2 h-4 w-4 text-cyan-400" />
                  Profile Stats
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Calendar, label: "Age", value: formData.age || "Not set", color: "from-blue-500/20 to-cyan-500/20" },
                    { icon: Ruler, label: "Height", value: formData.height ? `${formData.height} cm` : "Not set", color: "from-green-500/20 to-emerald-500/20" },
                    { icon: Weight, label: "Weight", value: formData.weight ? `${formData.weight} kg` : "Not set", color: "from-orange-500/20 to-red-500/20" },
                    { icon: Users, label: "Sex", value: formData.sex || "Not set", color: "from-purple-500/20 to-pink-500/20" },
                  ].map((stat) => (
                    <div key={stat.label} className={`flex items-center justify-between rounded-lg bg-gradient-to-r ${stat.color} border border-white/10 p-2 backdrop-blur-sm`}>
                      <div className="flex items-center">
                        <stat.icon className="mr-2 h-4 w-4 text-white/70" />
                        <span className="text-sm text-white/70">{stat.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-white capitalize">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center text-xl font-bold text-white">
                  <Edit3 className="mr-3 h-5 w-5 text-cyan-400" />
                  Edit Profile
                </h2>
                {successMessage && (
                  <motion.div 
                    className="inline-flex items-center rounded-xl border border-green-400/30 bg-green-500/20 px-4 py-2 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Check className="mr-2 h-4 w-4 text-green-400" />
                    <p className="text-sm font-medium text-green-300">
                      {successMessage}
                    </p>
                  </motion.div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <h3 className="mb-4 flex items-center text-sm font-semibold text-white">
                    <UserIcon className="mr-2 h-4 w-4 text-cyan-400" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-white/70">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`w-full rounded-lg border bg-white/10 px-3 py-2 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
                          errors.firstName ? "border-red-400" : "border-white/20"
                        }`}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-white/70">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`w-full rounded-lg border bg-white/10 px-3 py-2 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
                          errors.lastName ? "border-red-400" : "border-white/20"
                        }`}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <h3 className="mb-4 flex items-center text-sm font-semibold text-white">
                    <Ruler className="mr-2 h-4 w-4 text-cyan-400" />
                    Physical Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-white/70">
                        Age
                      </label>
                      <input
                        type="number"
                        min="13"
                        max="120"
                        value={formData.age || ""}
                        onChange={(e) => handleInputChange("age", parseInt(e.target.value) || 0)}
                        className={`w-full rounded-lg border bg-white/10 px-3 py-2 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
                          errors.age ? "border-red-400" : "border-white/20"
                        }`}
                        placeholder="Age"
                      />
                      {errors.age && (
                        <p className="mt-1 text-xs text-red-400">{errors.age}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-white/70">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        min="100"
                        max="250"
                        value={formData.height || ""}
                        onChange={(e) => handleInputChange("height", parseInt(e.target.value) || 0)}
                        className={`w-full rounded-lg border bg-white/10 px-3 py-2 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
                          errors.height ? "border-red-400" : "border-white/20"
                        }`}
                        placeholder="Height"
                      />
                      {errors.height && (
                        <p className="mt-1 text-xs text-red-400">{errors.height}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-white/70">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        min="30"
                        max="300"
                        value={formData.weight || ""}
                        onChange={(e) => handleInputChange("weight", parseInt(e.target.value) || 0)}
                        className={`w-full rounded-lg border bg-white/10 px-3 py-2 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
                          errors.weight ? "border-red-400" : "border-white/20"
                        }`}
                        placeholder="Weight"
                      />
                      {errors.weight && (
                        <p className="mt-1 text-xs text-red-400">{errors.weight}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <h3 className="mb-4 flex items-center text-sm font-semibold text-white">
                    <Users className="mr-2 h-4 w-4 text-cyan-400" />
                    Personal Preferences
                  </h3>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/70">
                      Sex
                    </label>
                    <select
                      value={formData.sex}
                      onChange={(e) => handleInputChange("sex", e.target.value)}
                      className={`w-full rounded-lg border bg-white/10 px-3 py-2 text-white backdrop-blur-sm transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
                        errors.sex ? "border-red-400" : "border-white/20"
                      }`}
                    >
                      <option value="" className="bg-gray-800">Select your sex</option>
                      <option value="male" className="bg-gray-800">Male</option>
                      <option value="female" className="bg-gray-800">Female</option>
                      <option value="other" className="bg-gray-800">Other</option>
                    </select>
                    {errors.sex && (
                      <p className="mt-1 text-xs text-red-400">{errors.sex}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <motion.button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                    whileHover={{ scale: saving ? 1 : 1.05 }}
                    whileTap={{ scale: saving ? 1 : 0.95 }}
                  >
                    {saving ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.main>
        <div className="h-8"></div>
      </div>
    </div>
  );
}