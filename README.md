# Fitness Tracker Hub 💪

A modern, feature-rich fitness tracking application built with React and React Router. Track your workouts, view detailed logs, and achieve your fitness goals!

## 🎯 Features

- **Workout Tracking**: Browse and search through cardio and strength training workouts
- **Advanced Filtering**: Filter workouts by type (cardio/strength) and search by name
- **Detailed Logs**: View workout logs filtered by day of the week
- **Programmatic Navigation**: Seamless navigation between workout details and logs
- **Query Parameter Preservation**: Maintain search and filter state across navigation
- **Responsive Design**: Beautiful UI that works on all devices
- **404 Handling**: Custom 404 page for invalid routes

## 🗺️ Route Map

### Core Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page with welcome message (accepts `welcomeMessage` prop), quick stats, and navigation to workouts |
| `/workouts` | `WorkoutList` | Browse all workouts with search (`?q=`) and type filter (`?type=cardio\|strength`) query parameters |
| `/workouts/:id` | `WorkoutDetail` | **Dynamic route** - Detailed view of a specific workout using `useParams` to get workout ID |
| `/workouts/:id/logs` | `WorkoutLogs` | **Nested route** - View workout logs filtered by day (`?day=monday\|tuesday\|...`) query parameter |
| `/settings` | `Settings` | User settings page (accepts `userTheme` prop for theme customization) |
| `*` | `NotFound` | **404 Fallback** - Custom error page for non-existent routes |

### Layout Structure

All routes are wrapped in a shared `Layout` component that provides:
- **Header**: Navigation bar with links to Home, Workouts, and Settings
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

### 4. Query Parameter Preservation
When navigating from the workout list to details and back, the search and filter parameters are preserved:
```javascript
// Preserve search params when navigating back
<Link to={`/workouts${preservedSearch}`} className="back-link">
  ← Back to Workouts
</Link>
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

- **React 18** - UI framework
- **React Router DOM 6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with gradients and animations

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

## 🎨 Component Props

### Home Component
- `welcomeMessage` (string, default: "Welcome to Your Fitness Journey!") - Custom welcome message

### Settings Component
- `userTheme` (string, default: "light") - Initial theme setting (light/dark/auto)

## 📊 Project Structure

```
src/
├── components/
│   └── Layout.jsx          # Shared layout with header, footer, and <Outlet />
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── WorkoutList.jsx     # Workout list with search/filter
│   ├── WorkoutDetail.jsx   # Individual workout details
│   ├── WorkoutLogs.jsx     # Workout logs with day filter
│   ├── Settings.jsx        # User settings
│   └── NotFound.jsx        # 404 error page
├── data/
│   └── workouts.js         # Mock workout data
├── styles/
│   └── Layout.css          # Layout styles
├── App.jsx                 # Main app with route configuration
└── main.jsx                # Entry point
```

## ✅ Acceptance Criteria Met

- ✅ Route Map in README with brief explanation of each page
- ✅ At least one nested route rendered via `<Outlet />` (Layout component)
- ✅ At least one dynamic route using `useParams` (/workouts/:id)
- ✅ Query params control visible state via `useSearchParams` (search, filter, day)
- ✅ Programmatic navigation with `useNavigate` (Start Workout button)
- ✅ 404 fallback route and shared layout with header/nav/footer
- ✅ Clean URL behavior on refresh/share/back (all state in URL)
- ✅ Query parameter preservation when navigating between pages

## 🎓 Learning Highlights

### Why React Router?
React apps are Single Page Applications (SPAs). Without a router, switching pages means manually hiding/showing components. React Router enables:

- **Client-side navigation** - No full page reloads → smoother UX
- **Clean, shareable URLs** - `/workouts/3`, `?q=run&type=cardio`
- **State in the URL** - Search, filter, and pagination survive refresh
- **Clear separation** - Layouts, nested pages, and detail views

### Common Pitfalls Avoided

1. **Query Parameter Merging** - Always preserve existing params when updating
2. **Stable Keys** - Added keys when mapping workout cards for performance
3. **Link vs `<a>`** - Used `<Link>` to prevent full page reloads
4. **Relative URLs** - Used relative links for maintainability
5. **Effect Cleanup** - Proper cleanup in useEffect (if timers were added)

## 📝 License

MIT License - feel free to use this project for learning purposes!

---

**Built with ❤️ for fitness enthusiasts and React developers**
