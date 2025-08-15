# FitSho

## Overview

A comprehensive fitness management platform that revolutionizes the relationship between personal trainers and their clients. This modern web application combines advanced workout planning, real-time progress tracking, and intelligent exercise recommendations in a sleek, futuristic interface.

The platform empowers trainers to create sophisticated workout templates with detailed exercise libraries, while clients enjoy an intuitive workout experience with visual exercise cards, set-by-set tracking, and smart recommendations. Built with cutting-edge web technologies and featuring a glassmorphic design aesthetic.

## Key Features

### 🏋️ Advanced Workout System

- **Dynamic Muscle Group Selection**: Start with one muscle group, seamlessly add more during workout creation
- **Visual Exercise Library**: High-quality exercise images from Unsplash with detailed metadata
- **Smart Recommendations**: AI-powered set/rep suggestions (e.g., "4×8-12", "3×to failure")
- **Individual Exercise Tracking**: Set-by-set logging with completion checkboxes and progress indicators
- **Equipment & Difficulty Indicators**: Visual badges for required equipment and difficulty levels

### 🎨 Modern UI/UX

- **Futuristic Design**: Glassmorphism effects with animated background elements
- **Responsive Interface**: Optimized for desktop, tablet, and mobile devices
- **Interactive Animations**: Framer Motion animations throughout the application
- **Dark Theme**: Modern dark slate color scheme with cyan/purple gradients

### 🔐 Secure Authentication & Authorization

- **JWT-Based Authentication**: HTTP-only cookies for enhanced security
- **Role-Based Access Control**: Separate interfaces for Clients, Trainers, and Admins
- **Admin Panel**: Comprehensive management dashboard for exercise and template administration
- **Password Security**: Bcrypt hashing with secure password reset functionality

### 📊 Comprehensive Tracking

- **Workout Logging**: Detailed session recording with notes and observations
- **Progress Monitoring**: Visual representation of performance metrics over time
- **Exercise Notes**: Per-exercise form cues and personal observations
- **Workout History**: Complete session history with searchable records

## Tech Stack

### Frontend

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphic theme
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API and custom hooks

### Backend

- **Database**: MongoDB with Prisma ORM
- **Authentication**: Custom JWT implementation with HTTP-only cookies
- **API**: Next.js API routes with proper authentication middleware
- **Security**: bcryptjs for password hashing, role-based access control

### Development

- **Language**: TypeScript for type safety
- **Deployment**: Vercel-ready with environment configuration
- **Database Hosting**: MongoDB Atlas compatible

## Architecture Highlights

### Database Design

- **MongoDB Collections**: Users, Exercises, Workout Templates, Workout Sessions
- **Prisma Schema**: Type-safe database operations with camelCase field naming
- **Data Relationships**: Efficient referencing between users, templates, and workout sessions

### Security Implementation

- **Row-Level Security**: Role-based access control at the database level
- **JWT Tokens**: Secure authentication with HTTP-only cookie storage
- **Password Hashing**: Industry-standard bcrypt implementation
- **Admin Protection**: Multi-layer authorization for administrative functions

### User Experience Flow

1. **Authentication**: Secure signup/login with role selection (Client/Trainer/Admin)
2. **Workout Creation**: Dynamic muscle group selection → Exercise library browsing → Template building
3. **Exercise Selection**: Visual cards with images, difficulty badges, and equipment indicators
4. **Workout Execution**: Set-by-set tracking with real-time progress indicators
5. **Progress Review**: Historical data visualization and performance analytics

## Key Innovations

- **Dynamic Workout Builder**: Real-time muscle group addition during workout creation
- **Visual Exercise Library**: Integration with Unsplash for high-quality exercise imagery
- **Smart Recommendations**: Context-aware set/rep suggestions based on exercise type
- **Glassmorphic Design**: Modern UI with backdrop blur and gradient effects
- **Set-by-Set Tracking**: Individual set completion with visual feedback
- **Role-Based Dashboards**: Tailored interfaces for different user types

## Future Roadmap

- [ ] **Nutrition Integration**: Meal planning and macro tracking
- [ ] **AI Workout Generation**: Machine learning-powered workout recommendations
- [ ] **Social Features**: Trainer-client messaging and community challenges
- [ ] **Mobile Application**: React Native companion app
- [ ] **Advanced Analytics**: Performance insights and trend analysis
