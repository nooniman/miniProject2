import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WorkoutProvider } from './context/WorkoutContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import WorkoutList from './pages/WorkoutList';
import WorkoutDetail from './pages/WorkoutDetail';
import WorkoutLogs from './pages/WorkoutLogs';
import AllLogs from './pages/AllLogs';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <WorkoutProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route 
              index 
              element={<Home welcomeMessage="Welcome to Your Fitness Journey!" />} 
            />
            
            <Route path="workouts" element={<WorkoutList />} />
            <Route path="workouts/:id" element={<WorkoutDetail />} />
            <Route path="workouts/:id/logs" element={<WorkoutLogs />} />
            
            {/* New All Logs Route */}
            <Route path="all-logs" element={<AllLogs />} />
            
            <Route 
              path="settings" 
              element={<Settings userTheme="light" />} 
            />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WorkoutProvider>
  );
}

export default App;