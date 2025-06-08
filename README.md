# Fitsho

## Overview

Fitsho is a comprehensive fitness management platform designed to bridge the gap between personal trainers and their clients. The application enables efficient workout planning, tracking, and progress monitoring in a collaborative environment.

Trainers can design custom workout templates with specific exercises, sets, and repetition schemes. Clients can then access these templates, log their workout sessions, track their progress over time, and receive guidance from their trainers.

Built with modern web technologies including Next.js (TypeScript), Supabase (PostgreSQL), and Tailwind CSS, the app provides a responsive and intuitive user experience across devices.

## Features

- **User Authentication**: Secure sign up, sign in, and session management via Supabase Auth with email/password and social login options.
- **Client Dashboard**: Clients can view assigned workouts, log completed sessions, and track their fitness journey.
- **Workout Templates**: Trainers create customizable workout templates with exercises, sets, reps, and instructions.
- **Exercise Library**: Extensive database of exercises with descriptions, muscle groups, and demonstration images.
- **Workout Logging**: Clients record detailed workout data including sets, reps, weights, and notes.
- **Progress Tracking**: Visual representation of performance metrics over time.


## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: React Context API and hooks
- **Backend & Authentication**: Supabase (PostgreSQL database + Auth services)

## TODO

- [ ] Implement notification system for workout reminders and trainer feedback
- [ ] Add nutrition tracking functionality with meal planning features
- [ ] Develop a messaging system between trainers and clients
- [ ] Create data visualization components for better progress tracking
- [ ] Implement export functionality for workout data
- [ ] Add integration with wearable fitness devices (Apple Watch, Fitbit, etc.)
- [ ] Develop a mobile app version using React Native
- [ ] Implement payment processing for premium features
- [ ] Add internationalization support
- [ ] Improve accessibility features

## Getting Started

### Prerequisites

- Node.js (v16.x or later)
- npm or yarn
- Supabase account (for database and authentication)

### Installation

1. Clone the repository
```bash
git clone https://github.com/A-Shalchian/fitsho.git
cd fitsho
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Contributing

Contributions are welcome and greatly appreciated! If you're interested in helping improve Fitsho, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
