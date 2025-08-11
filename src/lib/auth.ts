import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './db'
import { Role } from '@prisma/client'

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables')
}

// Type assertion to tell TypeScript that JWT_SECRET is definitely a string after the check
const jwtSecret: string = JWT_SECRET 

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

export async function signUp(data: SignUpData): Promise<{ user: User; token: string }> {
  const { email, password, firstName, lastName, role } = data

  const existingUser = await prisma.profile.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('User already exists with this email')
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.profile.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role
    }
  })

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: '7d' }
  )

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    },
    token
  }
}

export async function signIn(data: SignInData): Promise<{ user: User; token: string }> {
  const { email, password } = data

  const user = await prisma.profile.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    throw new Error('Invalid email or password')
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: '7d' }
  )

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    },
    token
  }
}

export function verifyToken(token: string): { userId: string; email: string; role: Role } {
  try {
    const decoded = jwt.verify(token, jwtSecret) as any
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    }
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export async function getCurrentUser(token: string): Promise<User | null> {
  try {
    const { userId } = verifyToken(token)
    
    const user = await prisma.profile.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age ?? undefined,
      height: user.height ?? undefined,
      weight: user.weight ?? undefined,
      sex: user.sex ?? undefined,
      role: user.role
    }
  } catch (error) {
    return null
  }
}

export async function getProfile(userId: string): Promise<User | null> {
  const user = await prisma.profile.findUnique({
    where: { id: userId }
  })

  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age ?? undefined,
    height: user.height ?? undefined,
    weight: user.weight ?? undefined,
    sex: user.sex ?? undefined,
    role: user.role
  }
}

export async function verifyAuth(request: Request): Promise<{ success: boolean; user?: User }> {
  try {
    const token = request.headers.get('cookie')?.split('auth-token=')[1]?.split(';')[0]

    if (!token) {
      return { success: false }
    }

    const user = await getCurrentUser(token)

    if (!user) {
      return { success: false }
    }

    return { success: true, user }
  } catch (error) {
    return { success: false }
  }
}
