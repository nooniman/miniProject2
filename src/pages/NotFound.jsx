import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <p>Maybe you took a wrong turn during your fitness journey?</p>
        
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link to="/workouts" className="btn btn-secondary">
            Browse Workouts
          </Link>
        </div>

        <div className="not-found-illustration">
          🏋️‍♂️ 💪 🏃‍♀️
        </div>
      </div>
    </div>
  );
}
