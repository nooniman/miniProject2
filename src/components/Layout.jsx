import { Outlet, Link } from 'react-router-dom';
import '../styles/Layout.css';

export default function Layout() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>💪 Fitness Tracker Hub</h1>
          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/workouts">Workouts</Link>
            <Link to="/settings">Settings</Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Fitness Tracker Hub | Stay Healthy, Stay Strong</p>
      </footer>
    </div>
  );
}
