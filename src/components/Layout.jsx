import { Outlet, Link, NavLink } from 'react-router-dom';
import '../styles/Layout.css';

export default function Layout() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>💪 Fitness Tracker Hub</h1>
          <nav className="main-nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
            <NavLink to="/workouts" className={({ isActive }) => isActive ? 'active' : ''}>
              Workouts
            </NavLink>
            <NavLink to="/all-logs" className={({ isActive }) => isActive ? 'active' : ''}>
              All Logs
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
              Settings
            </NavLink>
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