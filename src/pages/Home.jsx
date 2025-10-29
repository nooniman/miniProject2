import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useWorkouts } from '../context/WorkoutContext';
import './Home.css';

export default function Home({ welcomeMessage = "Welcome to Your Fitness Journey!" }) {
  const { workouts } = useWorkouts();
  const [userName, setUserName] = useState('');
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalLogs: 0,
    totalCalories: 0,
    totalMinutes: 0,
    weeklyGoal: 150,
    weeklyProgress: 0
  });

  useEffect(() => {
    // Load user name from settings
    const savedSettings = localStorage.getItem('fitnessTrackerSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setUserName(settings.userName || '');
      
      // Calculate weekly progress
      const weeklyGoal = settings.weeklyGoal || 150;
      const totalMinutes = workouts.reduce((sum, workout) => sum + workout.duration, 0);
      const weeklyProgress = Math.min((totalMinutes / weeklyGoal) * 100, 100);
      
      setStats(prev => ({ ...prev, weeklyGoal, weeklyProgress }));
    }

    // Calculate stats from workouts data
    const totalWorkouts = workouts.length;
    const totalLogs = workouts.reduce((sum, workout) => sum + workout.logs.length, 0);
    const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0);
    const totalMinutes = workouts.reduce((sum, workout) => sum + workout.duration, 0);

    setStats(prev => ({
      ...prev,
      totalWorkouts,
      totalLogs,
      totalCalories,
      totalMinutes
    }));
  }, [workouts]);

  // Get recent logs across all workouts
  const recentLogs = workouts
    .flatMap(workout => 
      workout.logs.map(log => ({
        ...log,
        workoutName: workout.name,
        workoutId: workout.id,
        workoutType: workout.type
      }))
    )
    .sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      return 0;
    })
    .slice(0, 3);

  // Get recommended workouts (workouts with no logs or least logs)
  const recommendedWorkouts = [...workouts]
    .sort((a, b) => a.logs.length - b.logs.length)
    .slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {userName ? `Welcome back, ${userName}! 💪` : welcomeMessage}
          </h1>
          <p className="hero-subtitle">Track your workouts, monitor progress, and achieve your fitness goals</p>
          
          <div className="hero-actions">
            <Link to="/workouts" className="btn btn-hero-primary">
              🏋️ Browse All Workouts
            </Link>
            <Link to="/all-logs" className="btn btn-hero-secondary">
              📊 View All Logs
            </Link>
          </div>
        </div>
        
        {/* Weekly Goal Progress */}
        {stats.weeklyGoal > 0 && (
          <div className="weekly-goal-card">
            <h3>🎯 Weekly Goal Progress</h3>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${stats.weeklyProgress}%` }}
              >
                {stats.weeklyProgress.toFixed(0)}%
              </div>
            </div>
            <p className="progress-text">
              {stats.totalMinutes} / {stats.weeklyGoal} minutes this week
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats Dashboard */}
      <div className="dashboard-section">
        <h2 className="section-title">📊 Your Fitness Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-card stat-card-primary">
            <div className="stat-icon">🏋️</div>
            <div className="stat-content">
              <p className="stat-number">{stats.totalWorkouts}</p>
              <p className="stat-label">Available Workouts</p>
            </div>
          </div>
          <div className="stat-card stat-card-success">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <p className="stat-number">{stats.totalLogs}</p>
              <p className="stat-label">Completed Sessions</p>
            </div>
          </div>
          <div className="stat-card stat-card-warning">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <p className="stat-number">{stats.totalMinutes}</p>
              <p className="stat-label">Total Minutes</p>
            </div>
          </div>
          <div className="stat-card stat-card-danger">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <p className="stat-number">{stats.totalCalories.toLocaleString()}</p>
              <p className="stat-label">Total Calories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {recentLogs.length > 0 && (
        <div className="recent-activity-section">
          <div className="section-header">
            <h2 className="section-title">🕐 Recent Activity</h2>
            <Link to="/all-logs" className="btn btn-sm btn-outline">
              View All Logs →
            </Link>
          </div>
          <div className="recent-logs-grid">
            {recentLogs.map((log, index) => (
              <div key={index} className="recent-log-card">
                <div className="recent-log-header">
                  <span className="recent-log-type">
                    {log.workoutType === 'cardio' ? '🏃' : '💪'}
                  </span>
                  <span className="recent-log-day">
                    {log.day.charAt(0).toUpperCase() + log.day.slice(1)}
                  </span>
                </div>
                <h4 className="recent-log-title">{log.workoutName}</h4>
                <div className="recent-log-details">
                  {Object.entries(log)
                    .filter(([key]) => !['workoutName', 'workoutId', 'workoutType', 'day', 'timestamp'].includes(key))
                    .slice(0, 2)
                    .map(([key, value]) => (
                      <span key={key} className="recent-log-detail">
                        <strong>{key}:</strong> {value}
                      </span>
                    ))
                  }
                </div>
                <Link 
                  to={`/workouts/${log.workoutId}/logs`}
                  className="recent-log-link"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Workouts */}
      <div className="recommended-section">
        <h2 className="section-title">⭐ Recommended for You</h2>
        <div className="recommended-grid">
          {recommendedWorkouts.map(workout => (
            <Link 
              key={workout.id}
              to={`/workouts/${workout.id}`}
              className="recommended-card"
            >
              <div className="recommended-badge">
                {workout.type === 'cardio' ? '🏃 Cardio' : '💪 Strength'}
              </div>
              <h3>{workout.name}</h3>
              <p className="recommended-description">{workout.description}</p>
              <div className="recommended-meta">
                <span>⏱️ {workout.duration} min</span>
                <span>🔥 {workout.calories} cal</span>
                <span className={`difficulty-badge ${workout.difficulty}`}>
                  {workout.difficulty}
                </span>
              </div>
              <div className="recommended-stats">
                <span className="logs-count">
                  {workout.logs.length} {workout.logs.length === 1 ? 'session' : 'sessions'} logged
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2 className="section-title">⚡ Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/workouts?type=cardio" className="quick-action-card cardio-action">
            <div className="quick-action-icon">🏃</div>
            <h3>Cardio Workouts</h3>
            <p>Browse cardio exercises</p>
          </Link>
          <Link to="/workouts?type=strength" className="quick-action-card strength-action">
            <div className="quick-action-icon">💪</div>
            <h3>Strength Training</h3>
            <p>Build muscle & strength</p>
          </Link>
          <Link to="/settings" className="quick-action-card settings-action">
            <div className="quick-action-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Customize your experience</p>
          </Link>
        </div>
      </div>

      {/* Motivation Quote */}
      <div className="motivation-section">
        <blockquote className="motivation-quote">
          <p>"The only bad workout is the one that didn't happen."</p>
          <footer>— Keep pushing forward! 💪</footer>
        </blockquote>
      </div>
    </div>
  );
}