import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

export default function Settings({ userTheme = 'light' }) {
  const [theme, setTheme] = useState(userTheme);
  const [notifications, setNotifications] = useState(true);
  const [weeklyGoal, setWeeklyGoal] = useState(150);
  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = () => {
    // In a real app, this would save to backend or localStorage
    setSavedMessage('✅ Settings saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>⚙️ Settings</h1>
        <p>Customize your fitness tracking experience</p>
      </div>

      <div className="settings-container">
        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="setting-item">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="setting-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="setting-item">
            <label htmlFor="notifications">
              Enable Workout Reminders
            </label>
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="setting-checkbox"
            />
          </div>
        </div>

        <div className="settings-section">
          <h2>Goals</h2>
          <div className="setting-item">
            <label htmlFor="weeklyGoal">
              Weekly Workout Goal (minutes)
            </label>
            <input
              type="number"
              id="weeklyGoal"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(parseInt(e.target.value))}
              min="30"
              max="500"
              className="setting-input"
            />
          </div>
        </div>

        <div className="settings-section">
          <h2>Account</h2>
          <div className="setting-item">
            <p className="setting-info">
              <strong>User:</strong> Fitness Enthusiast<br />
              <strong>Member Since:</strong> January 2025
            </p>
          </div>
        </div>

        {savedMessage && (
          <div className="save-message">
            {savedMessage}
          </div>
        )}

        <div className="settings-actions">
          <button onClick={handleSave} className="btn btn-primary">
            Save Settings
          </button>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </div>

      <div className="settings-info">
        <h3>Current Theme: {theme}</h3>
        <p>Weekly Goal: {weeklyGoal} minutes</p>
        <p>Notifications: {notifications ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  );
}
