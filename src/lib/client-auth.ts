import { Role } from '@prisma/client'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  age?: number
  height?: number
  weight?: number
  sex?: string
  role: Role
}

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: Role
}

export interface SignInData {
  email: string
  password: string
}

class AuthClient {
  async signUp(data: SignUpData): Promise<{ user: User; message: string }> {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to sign up')
    }

    return result
  }

  async signIn(data: SignInData): Promise<{ user: User; message: string }> {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to sign in')
    }

    return result
  }

  async signOut(): Promise<void> {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to sign out')
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch('/api/auth/me')

      if (!response.ok) {
        return null
      }

      const result = await response.json()
      return result.user
    } catch (error) {
      return null
    }
  }
}

export const authClient = new AuthClient()
