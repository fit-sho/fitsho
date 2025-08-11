'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient, User } from '@/lib/client-auth'
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Ruler, 
  Weight, 
  Users, 
  Save,
  ArrowLeft,
  Shield,
  Settings,
  Edit3,
  Check
} from 'lucide-react'

interface ProfileFormData {
  firstName: string
  lastName: string
  age: number
  height: number
  weight: number
  sex: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    age: 0,
    height: 0,
    weight: 0,
    sex: ''
  })
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({})
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authClient.getCurrentUser()
        if (!currentUser) {
          router.push('/login')
          return
        }
        setUser(currentUser)
        
        setFormData({
          firstName: currentUser.firstName || '',
          lastName: currentUser.lastName || '',
          age: (currentUser as any).age || 0,
          height: (currentUser as any).height || 0,
          weight: (currentUser as any).weight || 0,
          sex: (currentUser as any).sex || ''
        })
      } catch (error) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileFormData> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (formData.age && (formData.age < 13 || formData.age > 120)) {
      newErrors.age = 'Age must be between 13 and 120'
    }

    if (formData.height && (formData.height < 100 || formData.height > 250)) {
      newErrors.height = 'Height must be between 100 and 250 cm'
    }

    if (formData.weight && (formData.weight < 30 || formData.weight > 300)) {
      newErrors.weight = 'Weight must be between 30 and 300 kg'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setSuccessMessage('Profile updated successfully!')
      
      const updatedUser = await authClient.getCurrentUser()
      setUser(updatedUser)
      
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setErrors({ firstName: 'Failed to update profile. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof ProfileFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <span className="text-3xl font-bold text-white">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Profile Settings
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Manage your personal information and preferences
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold">
                <Settings className="w-5 h-5 mr-2" />
                Account Settings
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 sticky top-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 mb-3 flex items-center justify-center text-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 capitalize">
                  <Shield className="w-3 h-3 mr-1" />
                  {user.role.toLowerCase()}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <UserIcon className="w-4 h-4 mr-2 text-indigo-600" />
                  Profile Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-700">Age</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formData.age || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div className="flex items-center">
                      <Ruler className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">Height</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formData.height ? `${formData.height} cm` : 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <div className="flex items-center">
                      <Weight className="w-4 h-4 text-orange-600 mr-2" />
                      <span className="text-sm text-gray-700">Weight</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formData.weight ? `${formData.weight} kg` : 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="text-sm text-gray-700">Sex</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 capitalize">{formData.sex || 'Not set'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Edit3 className="w-6 h-6 mr-3 text-indigo-600" />
                  Edit Profile
                </h2>
                {successMessage && (
                  <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    <p className="text-green-800 text-sm font-medium">{successMessage}</p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-indigo-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Physical Information Section */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Ruler className="w-5 h-5 mr-2 text-blue-600" />
                    Physical Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        min="13"
                        max="120"
                        value={formData.age || ''}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          errors.age ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-300'
                        }`}
                        placeholder="Age"
                      />
                      {errors.age && (
                        <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                        <Ruler className="w-4 h-4 inline mr-1" />
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        id="height"
                        min="100"
                        max="250"
                        value={formData.height || ''}
                        onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          errors.height ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-300'
                        }`}
                        placeholder="Height"
                      />
                      {errors.height && (
                        <p className="mt-1 text-sm text-red-600">{errors.height}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                        <Weight className="w-4 h-4 inline mr-1" />
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        id="weight"
                        min="30"
                        max="300"
                        value={formData.weight || ''}
                        onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          errors.weight ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-300'
                        }`}
                        placeholder="Weight"
                      />
                      {errors.weight && (
                        <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personal Preferences Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-600" />
                    Personal Preferences
                  </h3>
                  <div>
                    <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-2">
                      Sex
                    </label>
                    <select
                      id="sex"
                      value={formData.sex}
                      onChange={(e) => handleInputChange('sex', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                        errors.sex ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      <option value="">Select your sex</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.sex && (
                      <p className="mt-1 text-sm text-red-600">{errors.sex}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Spacing */}
      <div className="h-8"></div>
    </div>
  )
}
