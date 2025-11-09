# Body Momentum - Workout Tracker

A comprehensive workout tracking application inspired by the Strong fitness app. Track your workouts, monitor your progress, and achieve your fitness goals.

## 🚀 Two Versions Available

### Standalone Version (Recommended for Quick Start)
**Just want to track workouts? Use the standalone version!**
- 📄 Single HTML file - `index.html`
- 🚫 No installation or build process
- 🌐 Open directly in browser
- 📱 Works on mobile and desktop
- 💾 ~35KB total size

**[See STANDALONE.md for details](STANDALONE.md)**

### Full Next.js Version (For Developers)
- ⚛️ Modern React/Next.js app
- 🛠️ Full build tooling
- 📦 Modular components
- 🎨 Tailwind CSS
- 🔧 Easy to extend

## Features

### Workout Management
- **Start and Log Workouts** - Begin empty workouts or use pre-defined routines
- **Exercise Library** - 30+ pre-built exercises covering all major muscle groups
- **Custom Exercises** - Add your own exercises with custom details
- **Set Tracking** - Track weight, reps, duration, and distance for each set
- **Set Tags** - Mark sets as warm-up, failure, or drop sets
- **Rest Timer** - Built-in countdown timer with customizable rest periods

### Progress Tracking
- **Workout History** - View all past workouts with calendar interface
- **Personal Records (PRs)** - Automatic tracking of your best lifts
- **1RM Calculator** - Estimated one-rep max for all exercises
- **Volume Charts** - Visual representation of training volume over time
- **Statistics Dashboard** - Total workouts, sets, reps, and volume

### Features
- **Dark Mode** - Toggle between light and dark themes
- **Data Export** - Export all workout data to CSV
- **Local Storage** - All data stored locally in your browser
- **Responsive Design** - Mobile-first design that works on all devices
- **No Account Required** - Start tracking immediately without sign-up

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd body_momentum
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Starting a Workout

1. Click "Start Empty Workout" on the home page
2. Enter a workout name (e.g., "Leg Day", "Upper Body")
3. Add exercises from the library
4. Log sets with weight and reps
5. Use the rest timer between sets
6. Finish the workout to save it

### Tracking Progress

1. Navigate to the Statistics page to view:
   - Personal records for each exercise
   - Volume charts over time
   - Total workout statistics

2. Use the History page to:
   - View past workouts on a calendar
   - Review workout details
   - Track consistency

### Exercise Library

The app includes 30+ exercises across categories:
- **Chest**: Bench Press, Incline Press, Flyes, Push-ups
- **Back**: Deadlift, Pull-ups, Rows, Lat Pulldown
- **Shoulders**: Overhead Press, Lateral Raises, Face Pulls
- **Legs**: Squats, Leg Press, Lunges, Leg Curls, Romanian Deadlifts
- **Arms**: Curls, Hammer Curls, Tricep Dips, Pushdowns
- **Core**: Planks, Crunches, Russian Twists
- **Cardio**: Running, Cycling, Rowing

### Data Management

- **Export Data**: Download all workout data as CSV from Settings
- **Clear Data**: Remove all data from local storage
- **Privacy**: All data stored locally - no server uploads

## Project Structure

```
body_momentum/
├── app/                    # Next.js app directory
│   ├── exercises/         # Exercise library page
│   ├── history/           # Workout history page
│   ├── settings/          # Settings page
│   ├── statistics/        # Statistics dashboard
│   ├── workouts/          # Workout pages
│   │   └── new/          # New workout page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── workout/          # Workout-specific components
│   ├── Navigation.tsx    # Bottom navigation
│   └── ThemeProvider.tsx # Theme context
├── lib/                  # Utilities and helpers
│   ├── db/              # Data and database utilities
│   ├── stores/          # Zustand stores
│   └── utils/           # Helper functions
└── types/               # TypeScript type definitions
```

## Features Inspired by Strong

This app recreates the core functionality of the Strong fitness app:

✅ Workout logging with exercises and sets
✅ Exercise library with 30+ exercises
✅ Set tracking with weight, reps, and tags
✅ Rest timer between sets
✅ Workout history
✅ Personal records tracking
✅ 1RM calculator
✅ Volume tracking
✅ Progress charts
✅ Dark mode
✅ Data export (CSV)

## Contributing

This is a personal project, but suggestions and improvements are welcome!

## License

MIT License - Feel free to use this project as a base for your own fitness tracking app.

## Acknowledgments

- Inspired by Strong Workout Tracker by Strong Fitness PTE Limited
- Built with modern web technologies
- Icons by Lucide
