import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWorkouts } from '../context/WorkoutContext';
import './AllLogs.css';

export default function AllLogs() {
  const { workouts } = useWorkouts();
  const [filterType, setFilterType] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all logs from all workouts
  const allLogs = workouts.flatMap(workout => 
    workout.logs.map(log => ({
      ...log,
      workoutId: workout.id,
      workoutName: workout.name,
      workoutType: workout.type,
      workoutDuration: workout.duration,
      workoutCalories: workout.calories
    }))
  );

  // Filter logs
  const filteredLogs = allLogs.filter(log => {
    const matchesType = !filterType || log.workoutType === filterType;
    const matchesDay = !filterDay || log.day === filterDay;
    const matchesSearch = !searchQuery || 
      log.workoutName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.notes && log.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesDay && matchesSearch;
  });

  // Get unique days
  const uniqueDays = [...new Set(allLogs.map(log => log.day))];

  // Calculate total stats
  const totalSessions = filteredLogs.length;
  const totalMinutes = filteredLogs.reduce((sum, log) => sum + log.workoutDuration, 0);
  const totalCalories = filteredLogs.reduce((sum, log) => sum + log.workoutCalories, 0);

  // Group logs by workout
  const logsByWorkout = filteredLogs.reduce((acc, log) => {
    if (!acc[log.workoutName]) {
      acc[log.workoutName] = [];
    }
    acc[log.workoutName].push(log);
    return acc;
  }, {});

  return (
    <div className="all-logs-page">
      <div className="all-logs-header">
        <h1>📊 All Workout Logs</h1>
        <p>Complete history of all your workout sessions</p>
      </div>

      {/* Stats Overview */}
      <div className="overview-stats">
        <div className="overview-stat-card">
          <span className="overview-stat-icon">📝</span>
          <div>
            <p className="overview-stat-value">{totalSessions}</p>
            <p className="overview-stat-label">Total Sessions</p>
          </div>
        </div>
        <div className="overview-stat-card">
          <span className="overview-stat-icon">⏱️</span>
          <div>
            <p className="overview-stat-value">{totalMinutes}</p>
            <p className="overview-stat-label">Total Minutes</p>
          </div>
        </div>
        <div className="overview-stat-card">
          <span className="overview-stat-icon">🔥</span>
          <div>
            <p className="overview-stat-value">{totalCalories.toLocaleString()}</p>
            <p className="overview-stat-label">Total Calories</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="all-logs-filters">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by workout or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Type:</label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="cardio">🏃 Cardio</option>
            <option value="strength">💪 Strength</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Day:</label>
          <select 
            value={filterDay} 
            onChange={(e) => setFilterDay(e.target.value)}
            className="filter-select"
          >
            <option value="">All Days</option>
            {uniqueDays.map(day => (
              <option key={day} value={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {(searchQuery || filterType || filterDay) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('');
              setFilterDay('');
            }}
            className="btn btn-secondary clear-filters-btn"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results Info */}
      <div className="results-summary">
        <p>Showing <strong>{filteredLogs.length}</strong> log{filteredLogs.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Logs Display */}
      {filteredLogs.length > 0 ? (
        <div className="logs-by-workout">
          {Object.entries(logsByWorkout).map(([workoutName, logs]) => (
            <div key={workoutName} className="workout-logs-group">
              <div className="workout-logs-group-header">
                <h3>
                  {logs[0].workoutType === 'cardio' ? '🏃' : '💪'} {workoutName}
                </h3>
                <span className="logs-count">{logs.length} session{logs.length !== 1 ? 's' : ''}</span>
                <Link 
                  to={`/workouts/${logs[0].workoutId}`}
                  className="btn btn-sm btn-outline"
                >
                  View Workout
                </Link>
              </div>

              <div className="logs-grid">
                {logs.map((log, index) => (
                  <div key={index} className="all-log-card">
                    <div className="all-log-card-header">
                      <span className="all-log-day-badge">
                        📅 {log.day.charAt(0).toUpperCase() + log.day.slice(1)}
                      </span>
                      <span className="all-log-type">
                        {log.workoutType === 'cardio' ? '🏃 Cardio' : '💪 Strength'}
                      </span>
                    </div>

                    <div className="all-log-details">
                      {Object.entries(log).map(([key, value]) => {
                        if (['day', 'workoutId', 'workoutName', 'workoutType', 
                             'workoutDuration', 'workoutCalories', 'timestamp'].includes(key)) {
                          return null;
                        }
                        return (
                          <div key={key} className="all-log-detail-item">
                            <span className="all-log-detail-label">
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>
                            <span className="all-log-detail-value">{value}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="all-log-meta">
                      <span>⏱️ {log.workoutDuration} min</span>
                      <span>🔥 {log.workoutCalories} cal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-logs-found">
          <div className="no-logs-icon">📭</div>
          <h3>No Logs Found</h3>
          <p>
            {allLogs.length === 0 
              ? "You haven't logged any workouts yet. Start tracking your fitness journey!"
              : "No logs match your current filters. Try adjusting your search criteria."}
          </p>
          {allLogs.length === 0 ? (
            <Link to="/workouts" className="btn btn-primary">
              Browse Workouts
            </Link>
          ) : (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterType('');
                setFilterDay('');
              }}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      <div className="back-to-home">
        <Link to="/" className="btn btn-secondary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}