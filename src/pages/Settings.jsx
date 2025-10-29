import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWorkouts } from '../context/WorkoutContext';
import './Settings.css';

export default function Settings({ userTheme: initialTheme = 'light' }) {
  const { workouts } = useWorkouts();
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [weeklyGoal, setWeeklyGoal] = useState(150);
  const [savedMessage, setSavedMessage] = useState('');
  const [userName, setUserName] = useState('Fitness Enthusiast');

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('fitnessTrackerSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setTheme(settings.theme || 'light');
      setNotifications(settings.notifications ?? true);
      setWeeklyGoal(settings.weeklyGoal || 150);
      setUserName(settings.userName || 'Fitness Enthusiast');
    }
  }, []);

  // Apply theme to document whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSave = () => {
    const settings = {
      theme,
      notifications,
      weeklyGoal,
      userName
    };
    
    localStorage.setItem('fitnessTrackerSettings', JSON.stringify(settings));
    
    setSavedMessage('✅ Settings saved successfully!');
    
    setTimeout(() => {
      setSavedMessage('');
    }, 3000);
  };

  const handleReset = () => {
    setTheme('light');
    setNotifications(true);
    setWeeklyGoal(150);
    setUserName('Fitness Enthusiast');
    
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.removeItem('fitnessTrackerSettings');
    
    setSavedMessage('🔄 Settings reset to defaults!');
    setTimeout(() => {
      setSavedMessage('');
    }, 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>⚙️ Settings</h1>
        <p>Customize your fitness tracking experience</p>
      </div>

      <div className="settings-container">
        <div className="settings-section">
          <h2>👤 Profile</h2>
          <div className="setting-item">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="setting-input"
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="settings-section">
          <h2>🎨 Appearance</h2>
          <div className="setting-item">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="setting-select"
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </div>
          <div className="theme-preview">
            Current theme: <strong>{theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}</strong>
          </div>
        </div>

        <div className="settings-section">
          <h2>🔔 Notifications</h2>
          <div className="setting-item">
            <label htmlFor="notifications">
              Enable Workout Reminders
            </label>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="notifications"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="setting-checkbox"
              />
              <span className="checkbox-label">
                {notifications ? '✅ Enabled' : '❌ Disabled'}
              </span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>🎯 Goals</h2>
          <div className="setting-item">
            <label htmlFor="weeklyGoal">
              Weekly Workout Goal (minutes)
            </label>
            <input
              type="number"
              id="weeklyGoal"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(parseInt(e.target.value) || 0)}
              min="30"
              max="500"
              step="10"
              className="setting-input"
            />
          </div>
          <div className="goal-info">
            <p>💡 Recommended: 150 minutes per week for adults</p>
            <p>Your goal: <strong>{weeklyGoal} minutes/week</strong></p>
          </div>
        </div>

        <div className="settings-section">
          <h2>📊 Account</h2>
          <div className="account-info">
            <p><strong>User:</strong> {userName}</p>
            <p><strong>Member Since:</strong> January 2025</p>
            <p><strong>Total Workouts Available:</strong> {workouts.length}</p>
          </div>
        </div>

        {savedMessage && (
          <div className="save-message">
            {savedMessage}
          </div>
        )}

        <div className="settings-actions">
          <button onClick={handleSave} className="btn btn-primary">
            💾 Save Settings
          </button>
          <button onClick={handleReset} className="btn btn-outline">
            🔄 Reset to Defaults
          </button>
          <Link to="/" className="btn btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="settings-summary">
        <h3>📋 Current Configuration</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Theme:</span>
            <span className="summary-value">{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Notifications:</span>
            <span className="summary-value">{notifications ? '✅ Enabled' : '❌ Disabled'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Weekly Goal:</span>
            <span className="summary-value">{weeklyGoal} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}