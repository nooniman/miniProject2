import { useParams, useSearchParams, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useWorkouts } from '../context/WorkoutContext';
import './WorkoutLogs.css';

export default function WorkoutLogs() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { workouts, addLog, deleteLog } = useWorkouts();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLog, setNewLog] = useState({
    day: 'monday',
    notes: ''
  });
  
  // Dynamic fields based on workout type
  const [dynamicFields, setDynamicFields] = useState({});
  
  const dayFilter = searchParams.get('day') || '';
  const workout = workouts.find(w => w.id === parseInt(id));

  if (!workout) {
    return (
      <div className="workout-logs-page">
        <div className="not-found">
          <h2>❌ Workout not found</h2>
          <Link to="/workouts" className="btn btn-primary">← Back to Workouts</Link>
        </div>
      </div>
    );
  }

  // Get suggested fields based on workout type and existing logs
  const getSuggestedFields = () => {
    if (workout.logs.length === 0) {
      // Default fields based on type
      if (workout.type === 'cardio') {
        return ['distance', 'time', 'avgHR'];
      } else {
        return ['sets', 'reps', 'weight'];
      }
    }
    
    // Extract unique fields from existing logs
    const fields = new Set();
    workout.logs.forEach(log => {
      Object.keys(log).forEach(key => {
        if (key !== 'day' && key !== 'notes' && key !== 'timestamp') {
          fields.add(key);
        }
      });
    });
    return Array.from(fields);
  };

  const suggestedFields = getSuggestedFields();

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

  // Handle adding a new log
  const handleAddLog = (e) => {
    e.preventDefault();
    
    if (newLog.notes.trim() || Object.keys(dynamicFields).length > 0) {
      addLog(parseInt(id), {
        ...newLog,
        ...dynamicFields,
        timestamp: new Date().toISOString()
      });
      
      setNewLog({ day: 'monday', notes: '' });
      setDynamicFields({});
      setShowAddForm(false);
    }
  };

  // Handle deleting a log
  const handleDeleteLog = (logIndex) => {
    if (confirm('Are you sure you want to delete this log?')) {
      deleteLog(parseInt(id), logIndex);
    }
  };

  // Add custom field
  const [customFieldName, setCustomFieldName] = useState('');
  const [customFieldValue, setCustomFieldValue] = useState('');

  const handleAddCustomField = () => {
    if (customFieldName.trim() && customFieldValue.trim()) {
      setDynamicFields({
        ...dynamicFields,
        [customFieldName.trim()]: customFieldValue.trim()
      });
      setCustomFieldName('');
      setCustomFieldValue('');
    }
  };

  const handleRemoveField = (fieldName) => {
    const updated = { ...dynamicFields };
    delete updated[fieldName];
    setDynamicFields(updated);
  };

  return (
    <div className="workout-logs-page">
      <Link to={`/workouts/${id}`} className="back-link">
        ← Back to {workout.name}
      </Link>

      <div className="logs-header">
        <h1>📊 Workout Logs</h1>
        <h2>{workout.name}</h2>
        <div className="workout-type-indicator">
          {workout.type === 'cardio' ? '🏃 Cardio' : '💪 Strength'} | 
          {workout.difficulty === 'beginner' && ' 🟢 Beginner'}
          {workout.difficulty === 'intermediate' && ' 🟡 Intermediate'}
          {workout.difficulty === 'advanced' && ' 🔴 Advanced'}
        </div>
        {fromDetail && (
          <div className="welcome-banner">
            🎉 Ready to start tracking your {workout.name}! Add your first log below.
          </div>
        )}
      </div>

      {/* Quick Add Button */}
      <div className="quick-actions">
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className={`btn ${showAddForm ? 'btn-secondary' : 'btn-primary'} btn-large`}
        >
          {showAddForm ? '✖ Cancel' : '➕ Add New Workout Log'}
        </button>
      </div>

      {/* Add Log Form */}
      {showAddForm && (
        <div className="add-log-form">
          <h3>📝 Log Your Workout</h3>
          <form onSubmit={handleAddLog}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="day">📅 Day</label>
                <select
                  id="day"
                  value={newLog.day}
                  onChange={(e) => setNewLog({ ...newLog, day: e.target.value })}
                  className="form-input"
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
            </div>

            {/* Suggested Fields */}
            {suggestedFields.length > 0 && (
              <div className="suggested-fields">
                <h4>💡 Common Fields for this Workout:</h4>
                <div className="form-row">
                  {suggestedFields.map(field => (
                    <div key={field} className="form-group">
                      <label htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        id={field}
                        value={dynamicFields[field] || ''}
                        onChange={(e) => setDynamicFields({
                          ...dynamicFields,
                          [field]: e.target.value
                        })}
                        className="form-input"
                        placeholder={`e.g., ${getPlaceholder(field)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Fields */}
            {Object.keys(dynamicFields).length > 0 && (
              <div className="added-fields">
                <h4>✅ Added Fields:</h4>
                <div className="field-tags">
                  {Object.entries(dynamicFields).map(([key, value]) => (
                    !suggestedFields.includes(key) && (
                      <div key={key} className="field-tag">
                        <strong>{key}:</strong> {value}
                        <button
                          type="button"
                          onClick={() => handleRemoveField(key)}
                          className="remove-field-btn"
                        >
                          ×
                        </button>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Add Custom Field */}
            <div className="custom-field-section">
              <h4>➕ Add Custom Field</h4>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    value={customFieldName}
                    onChange={(e) => setCustomFieldName(e.target.value)}
                    className="form-input"
                    placeholder="Field name (e.g., 'pace', 'mood')"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={customFieldValue}
                    onChange={(e) => setCustomFieldValue(e.target.value)}
                    className="form-input"
                    placeholder="Value"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomField}
                  className="btn btn-secondary"
                  disabled={!customFieldName.trim() || !customFieldValue.trim()}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">📝 Notes (Optional)</label>
              <textarea
                id="notes"
                value={newLog.notes}
                onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                className="form-input"
                rows="3"
                placeholder="How did it feel? Any achievements or observations?"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              💾 Save Workout Log
            </button>
          </form>
        </div>
      )}

      {/* Day Filter */}
      {workout.logs.length > 0 && (
        <div className="day-filter">
          <h3>🗓️ Filter by Day</h3>
          <div className="day-buttons">
            <button
              className={`day-btn ${!dayFilter ? 'active' : ''}`}
              onClick={() => handleDayFilter('')}
            >
              All Days ({workout.logs.length})
            </button>
            {uniqueDays.map(day => {
              const count = workout.logs.filter(l => l.day === day).length;
              return (
                <button
                  key={day}
                  className={`day-btn ${dayFilter === day ? 'active' : ''}`}
                  onClick={() => handleDayFilter(day)}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Info */}
      {workout.logs.length > 0 && (
        <div className="results-info">
          <p>
            📊 Showing <strong>{filteredLogs.length}</strong> log{filteredLogs.length !== 1 ? 's' : ''}
            {dayFilter && ` for ${dayFilter.charAt(0).toUpperCase() + dayFilter.slice(1)}`}
          </p>
        </div>
      )}

      {/* Logs Display */}
      <div className="logs-container">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <div key={index} className="log-card">
              <div className="log-header">
                <span className="log-day-badge">
                  📅 {log.day.charAt(0).toUpperCase() + log.day.slice(1)}
                </span>
                <span className="log-number">Session #{workout.logs.indexOf(log) + 1}</span>
              </div>
              <div className="log-details-grid">
                {Object.entries(log).map(([key, value]) => {
                  if (key === 'day' || key === 'timestamp') return null;
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
              <button
                className="btn btn-danger delete-log-btn"
                onClick={() => handleDeleteLog(workout.logs.indexOf(log))}
              >
                🗑️ Delete Log
              </button>
            </div>
          ))
        ) : (
          <div className="no-logs">
            <div className="no-logs-icon">📭</div>
            <h3>No Logs Yet</h3>
            <p>
              {dayFilter 
                ? `No workout logs found for ${dayFilter}.` 
                : 'Start tracking your progress by adding your first workout log!'}
            </p>
            {dayFilter ? (
              <button
                className="btn btn-primary"
                onClick={() => handleDayFilter('')}
              >
                Show All Days
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setShowAddForm(true)}
              >
                ➕ Add Your First Log
              </button>
            )}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredLogs.length > 0 && (
        <div className="logs-summary">
          <h3>📈 Summary Statistics</h3>
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
                <p className="stat-value">{(workout.calories * filteredLogs.length).toLocaleString()}</p>
                <p className="stat-label">Calories Burned</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="action-buttons">
        <Link to={`/workouts/${id}`} className="btn btn-secondary">
          📋 View Workout Details
        </Link>
        <Link to="/workouts" className="btn btn-outline">
          🏋️ Browse Other Workouts
        </Link>
      </div>
    </div>
  );
}

// Helper function for placeholders
function getPlaceholder(field) {
  const placeholders = {
    distance: '5km',
    time: '28:30',
    avgHR: '165 bpm',
    sets: '4x10',
    reps: '12',
    weight: '60kg',
    rounds: '10',
    pace: '5:40/km',
    speed: '22 km/h',
    exercises: '8',
    duration: '45 min',
    poses: '20'
  };
  return placeholders[field.toLowerCase()] || 'Enter value';
}