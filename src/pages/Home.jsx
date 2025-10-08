import { Link } from 'react-router-dom';
import './Home.css';

export default function Home({ welcomeMessage = "Welcome to Your Fitness Journey!" }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h2 className="welcome-message">{welcomeMessage}</h2>
        <p className="tagline">Track, Plan, and Achieve Your Fitness Goals</p>
        
        <div className="cta-buttons">
          <Link to="/workouts" className="btn btn-primary">
            Browse Workouts
          </Link>
          <Link to="/workouts?type=cardio" className="btn btn-secondary">
            Cardio Workouts
          </Link>
          <Link to="/workouts?type=strength" className="btn btn-secondary">
            Strength Training
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">🏃</span>
          <h3>Track Workouts</h3>
          <p>Monitor your cardio and strength training sessions</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📊</span>
          <h3>View Logs</h3>
          <p>See your progress with detailed workout logs</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🎯</span>
          <h3>Set Goals</h3>
          <p>Plan your fitness journey with custom goals</p>
        </div>
      </div>

      <div className="stats-preview">
        <h3>Quick Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">8</span>
            <span className="stat-label">Total Workouts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2,290</span>
            <span className="stat-label">Calories Burned</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">365</span>
            <span className="stat-label">Minutes Exercised</span>
          </div>
        </div>
      </div>
    </div>
  );
}
