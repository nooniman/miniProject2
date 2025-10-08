import { useParams, useSearchParams, Link, useLocation } from 'react-router-dom';
import { workouts } from '../data/workouts';
import './WorkoutLogs.css';

export default function WorkoutLogs() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  const dayFilter = searchParams.get('day') || '';
  const workout = workouts.find(w => w.id === parseInt(id));

  if (!workout) {
    return (
      <div className="workout-logs-page">
        <div className="not-found">
          <h2>Workout not found</h2>
          <Link to="/workouts" className="btn btn-primary">Back to Workouts</Link>
        </div>
      </div>
    );
  }

  // Filter logs by day if specified
  const filteredLogs = dayFilter
    ? workout.logs.filter(log => log.day.toLowerCase() === dayFilter.toLowerCase())
    : workout.logs;

  // Handle day filter change
  const handleDayFilter = (day) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (day) {
      newParams.set('day', day);
    } else {
      newParams.delete('day');
    }
    
    setSearchParams(newParams);
  };

  // Get unique days from logs
  const uniqueDays = [...new Set(workout.logs.map(log => log.day))];

  // Check if we came from the detail page
  const fromDetail = location.state?.fromDetail;

  return (
    <div className="workout-logs-page">
      <Link to={`/workouts/${id}`} className="back-link">
        ← Back to {workout.name}
      </Link>

      <div className="logs-header">
        <h1>📊 Workout Logs</h1>
        <h2>{workout.name}</h2>
        {fromDetail && (
          <div className="welcome-banner">
            🎉 Ready to start tracking your {workout.name}! View your history below.
          </div>
        )}
      </div>

      {/* Day Filter */}
      <div className="day-filter">
        <h3>Filter by Day</h3>
        <div className="day-buttons">
          <button
            className={`day-btn ${!dayFilter ? 'active' : ''}`}
            onClick={() => handleDayFilter('')}
          >
            All Days
          </button>
          {uniqueDays.map(day => (
            <button
              key={day}
              className={`day-btn ${dayFilter === day ? 'active' : ''}`}
              onClick={() => handleDayFilter(day)}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>
          Showing {filteredLogs.length} log{filteredLogs.length !== 1 ? 's' : ''}
          {dayFilter && ` for ${dayFilter.charAt(0).toUpperCase() + dayFilter.slice(1)}`}
        </p>
      </div>

      {/* Logs Display */}
      <div className="logs-container">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <div key={index} className="log-card">
              <div className="log-header">
                <span className="log-day-badge">
                  📅 {log.day.charAt(0).toUpperCase() + log.day.slice(1)}
                </span>
                <span className="log-number">Session #{index + 1}</span>
              </div>
              <div className="log-details-grid">
                {Object.entries(log).map(([key, value]) => {
                  if (key === 'day') return null;
                  return (
                    <div key={key} className="log-detail">
                      <span className="detail-label">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span className="detail-value">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="no-logs">
            <p>No logs found{dayFilter && ` for ${dayFilter}`}.</p>
            {dayFilter && (
              <button
                className="btn btn-primary"
                onClick={() => handleDayFilter('')}
              >
                Show All Days
              </button>
            )}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredLogs.length > 0 && (
        <div className="logs-summary">
          <h3>Summary</h3>
          <div className="summary-stats">
            <div className="stat-card">
              <span className="stat-icon">📝</span>
              <div>
                <p className="stat-value">{filteredLogs.length}</p>
                <p className="stat-label">Total Sessions</p>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⏱️</span>
              <div>
                <p className="stat-value">{workout.duration * filteredLogs.length}</p>
                <p className="stat-label">Minutes Trained</p>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🔥</span>
              <div>
                <p className="stat-value">{workout.calories * filteredLogs.length}</p>
                <p className="stat-label">Calories Burned</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="action-buttons">
        <Link to={`/workouts/${id}`} className="btn btn-secondary">
          View Workout Details
        </Link>
        <Link to="/workouts" className="btn btn-outline">
          Browse Other Workouts
        </Link>
      </div>
    </div>
  );
}
