import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WorkoutProvider } from './context/WorkoutContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import WorkoutList from './pages/WorkoutList';
import WorkoutDetail from './pages/WorkoutDetail';
import WorkoutLogs from './pages/WorkoutLogs';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <WorkoutProvider>
      <BrowserRouter>
        <Routes>
          {/* Shared Layout with Outlet */}
          <Route path="/" element={<Layout />}>
            {/* Home route with welcomeMessage prop */}
            <Route 
              index 
              element={<Home welcomeMessage="Welcome to Your Fitness Journey!" />} 
            />
            
            {/* Workouts list with query params for search and filter */}
            <Route path="workouts" element={<WorkoutList />} />
            
            {/* Dynamic route - Workout details with useParams */}
            <Route path="workouts/:id" element={<WorkoutDetail />} />
            
            {/* Nested route - Workout logs with day filter query param */}
            <Route path="workouts/:id/logs" element={<WorkoutLogs />} />
            
            {/* Settings route with userTheme prop */}
            <Route 
              path="settings" 
              element={<Settings userTheme="light" />} 
            />
            
            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WorkoutProvider>
  );
}

export default App;
