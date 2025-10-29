# Fitness Tracker Hub 💪

A modern, feature-rich fitness tracking application built with React, React Router, and Context API. Track your workouts, manage logs with dynamic fields, and achieve your fitness goals with a personalized experience!

## 🎯 Features

- **Workout Tracking**: Browse and search through cardio and strength training workouts
- **Advanced Filtering**: Filter workouts by type (cardio/strength) and search by name
- **Dynamic Workout Logs**: Add custom fields to workout logs based on your tracking needs
- **Comprehensive Log Management**: View all logs across workouts or filter by specific workouts
- **Programmatic Navigation**: Seamless navigation between workout details and logs
- **Query Parameter Preservation**: Maintain search and filter state across navigation
- **Persistent Storage**: All data saved to localStorage with Context API state management
- **Personalized Settings**: Theme customization, weekly goals, and user preferences
- **Responsive Design**: Beautiful UI that works flawlessly on all devices
- **404 Handling**: Custom 404 page for invalid routes

## 🗺️ Route Map

### Core Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page with personalized dashboard, quick stats, recent activity, and recommended workouts (accepts `welcomeMessage` prop) |
| `/workouts` | `WorkoutList` | Browse all workouts with search (`?q=`) and type filter (`?type=cardio\|strength`) query parameters |
| `/workouts/:id` | `WorkoutDetail` | **Dynamic route** - Detailed view of a specific workout using `useParams` to get workout ID |
| `/workouts/:id/logs` | `WorkoutLogs` | **Nested route** - View and manage workout logs with day filter (`?day=monday\|tuesday\|...`) query parameter and dynamic field support |
| `/all-logs` | `AllLogs` | View all workout logs across all workouts with comprehensive filtering |
| `/settings` | `Settings` | User settings page with theme, notifications, and goal customization (accepts `userTheme` prop) |
| `*` | `NotFound` | **404 Fallback** - Custom error page for non-existent routes |

### Layout Structure

All routes are wrapped in a shared `Layout` component that provides:
- **Header**: Navigation bar with links to Home, Workouts, All Logs, and Settings
- **Main Content**: Rendered via `<Outlet />` from React Router
- **Footer**: Application footer with copyright information

## 🚀 Key React Router Features Implemented

### 1. Dynamic Routes with `useParams`
```javascript
// In WorkoutDetail.jsx
const { id } = useParams();
const workout = workouts.find(w => w.id === parseInt(id));
```

### 2. Query Parameters with `useSearchParams`
```javascript
// In WorkoutList.jsx - Search and Filter
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q') || '';
const typeFilter = searchParams.get('type') || '';

// In WorkoutLogs.jsx - Day Filter
const dayFilter = searchParams.get('day') || '';
```

### 3. Programmatic Navigation with `useNavigate`
```javascript
// In WorkoutDetail.jsx - Navigate to logs when starting workout
const navigate = useNavigate();
const handleStartWorkout = () => {
  navigate(`/workouts/${id}/logs`, { 
    state: { fromDetail: true, workoutName: workout.name }
  });
};
```

### 4. Context API State Management
```javascript
// WorkoutContext provides centralized state management
const { workouts, addWorkout, addLog, deleteLog } = useWorkouts();
```

### 5. Nested Routes with Outlet
The `Layout` component uses `<Outlet />` to render child routes while maintaining the header and footer.

## 📦 Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd miniProject2

# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173/`

## 🛠️ Technologies Used

- **React 18** - UI framework with hooks
- **React Router DOM 6** - Client-side routing
- **Context API** - Global state management
- **localStorage** - Data persistence
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with gradients, animations, and responsive design

## 📱 Usage Examples

### Search Workouts
Navigate to `/workouts?q=run` to search for workouts containing "run"

### Filter by Type
- `/workouts?type=cardio` - Show only cardio workouts
- `/workouts?type=strength` - Show only strength training workouts

### Combined Search and Filter
`/workouts?q=leg&type=strength` - Search for "leg" in strength workouts only

### Filter Logs by Day
Navigate to `/workouts/1/logs?day=monday` to see only Monday's logs for workout #1

### Dynamic Log Fields
Add custom fields like "pace", "mood", or any metric relevant to your workout

## 🎨 Component Props

### Home Component
- `welcomeMessage` (string, default: "Welcome to Your Fitness Journey!") - Custom welcome message

### Settings Component
- `userTheme` (string, default: "light") - Initial theme setting (light/dark)

## 📊 Project Structure

```
src/
├── components/
│   └── Layout.jsx          # Shared layout with header, footer, and <Outlet />
├── context/
│   └── WorkoutContext.jsx  # Context API for global state management
├── pages/
│   ├── Home.jsx            # Dashboard with stats and recommendations
│   ├── WorkoutList.jsx     # Workout list with search/filter
│   ├── WorkoutDetail.jsx   # Individual workout details
│   ├── WorkoutLogs.jsx     # Workout logs with dynamic fields
│   ├── AllLogs.jsx         # All logs across workouts
│   ├── Settings.jsx        # User settings and preferences
│   └── NotFound.jsx        # 404 error page
├── data/
│   └── workouts.js         # Initial workout data
├── styles/
│   ├── Layout.css          # Layout styles
│   ├── Home.css            # Home page styles
│   ├── WorkoutList.css     # Workout list styles
│   ├── WorkoutDetail.css   # Workout detail styles
│   ├── WorkoutLogs.css     # Workout logs styles
│   ├── AllLogs.css         # All logs page styles
│   ├── Settings.css        # Settings page styles
│   └── NotFound.css        # 404 page styles
├── App.jsx                 # Main app with route configuration
├── App.css                 # Global app styles
├── index.css               # Global styles and CSS variables
└── main.jsx                # Entry point
```

## ✅ Acceptance Criteria Met

- ✅ Route Map in README with explanation of each page
- ✅ Nested routes rendered via `<Outlet />` (Layout component)
- ✅ Dynamic routes using `useParams` (/workouts/:id)
- ✅ Query params control visible state via `useSearchParams`
- ✅ Programmatic navigation with `useNavigate`
- ✅ 404 fallback route and shared layout
- ✅ Clean URL behavior on refresh/share/back
- ✅ Context API for state management
- ✅ localStorage for data persistence
- ✅ Fully responsive design

## 🎓 Learning Highlights

### Why React Router?
React apps are Single Page Applications (SPAs). Without a router, switching pages means manually hiding/showing components. React Router enables:

- **Client-side navigation** - No full page reloads → smoother UX
- **Clean, shareable URLs** - `/workouts/3`, `?q=run&type=cardio`
- **State in the URL** - Search, filter, and pagination survive refresh
- **Clear separation** - Layouts, nested pages, and detail views

### Why Context API?
Instead of prop drilling through multiple components, Context API provides:

- **Global state** - Workouts, logs, and user settings accessible anywhere
- **Centralized logic** - CRUD operations in one place
- **Performance** - Only re-renders components that consume the context
- **localStorage integration** - Automatic data persistence

### Key Features

1. **Dynamic Workout Logs** - Add any field to your workout logs (distance, sets, reps, mood, etc.)
2. **Suggested Fields** - System suggests common fields based on workout type and history
3. **Comprehensive Filtering** - Filter logs by day, workout type, and search terms
4. **Persistent Data** - All workouts and logs saved to localStorage
5. **Weekly Goal Tracking** - Set and track your weekly exercise goals
6. **Theme Support** - Light and dark mode with persistent preferences

### Common Pitfalls Avoided

1. **Query Parameter Merging** - Always preserve existing params when updating
2. **Stable Keys** - Added keys when mapping workout cards for performance
3. **Link vs `<a>`** - Used `<Link>` to prevent full page reloads
4. **Context Re-renders** - Memoized context values where appropriate
5. **localStorage Sync** - Proper useEffect dependencies for data persistence
6. **Responsive Design** - Mobile-first approach with CSS Grid and Flexbox

## 💾 Data Persistence

All data is stored in localStorage:
- **Workouts** - New workouts, logs, and modifications
- **Settings** - User preferences, theme, and weekly goals

Data persists across browser sessions and page refreshes.

## 🎨 Styling Features

- **CSS Variables** - Theme-aware color system
- **Responsive Grid** - Auto-fit layouts for all screen sizes
- **Smooth Animations** - Transitions and hover effects
- **Mobile-First** - Optimized for mobile, tablet, and desktop
- **Dark Mode** - Full theme support with smooth transitions

## 📝 License

MIT License - feel free to use this project for learning purposes!

---