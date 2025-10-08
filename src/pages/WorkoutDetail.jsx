import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useWorkouts } from '../context/WorkoutContext';
import './WorkoutDetail.css';

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { workouts } = useWorkouts();
  
  const workout = workouts.find(w => w.id === parseInt(id));

  if (!workout) {
    return (
      <div className="workout-detail-page">
        <div className="not-found">
          <h2>Workout not found</h2>
          <Link to="/workouts" className="btn btn-primary">Back to Workouts</Link>
        </div>
      </div>
    );
  }

  // Preserve query params from previous page
  const preservedSearch = location.state?.fromSearch || '';

  const handleStartWorkout = () => {
    // Programmatic navigation to start the workout
    navigate(`/workouts/${id}/logs`, { 
      state: { 
        fromDetail: true,
        workoutName: workout.name 
      }
    });
  };

  return (
    <div className="workout-detail-page">
      {/* Back button with preserved query params */}
      <Link 
        to={`/workouts${preservedSearch}`} 
        className="back-link"
      >
        ← Back to Workouts
      </Link>

      <div className="workout-detail-header">
        <div className="workout-type-badge-large">
          {workout.type === 'cardio' ? '🏃' : '💪'} {workout.type.toUpperCase()}
        </div>
        <h1>{workout.name}</h1>
        <p className="workout-description-large">{workout.description}</p>
      </div>

      <div className="workout-info-grid">
        <div className="info-card">
          <span className="info-icon">⏱️</span>
          <div>
            <h4>Duration</h4>
            <p>{workout.duration} minutes</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">🔥</span>
          <div>
            <h4>Calories</h4>
            <p>{workout.calories} kcal</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">📊</span>
          <div>
            <h4>Difficulty</h4>
            <p className={`difficulty ${workout.difficulty}`}>{workout.difficulty}</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">📝</span>
          <div>
            <h4>Total Logs</h4>
            <p>{workout.logs.length} sessions</p>
          </div>
        </div>
      </div>

      <div className="workout-actions">
        <button 
          onClick={handleStartWorkout}
          className="btn btn-primary btn-large"
        >
          🎯 Start Workout
        </button>
        <Link 
          to={`/workouts/${id}/logs`}
          className="btn btn-secondary btn-large"
        >
          📊 View All Logs
        </Link>
      </div>

      <div className="recent-logs">
        <h3>Recent Logs</h3>
        {workout.logs.length > 0 ? (
          <div className="logs-preview">
            {workout.logs.slice(0, 3).map((log, index) => (
              <div key={index} className="log-preview-card">
                <div className="log-day">📅 {log.day}</div>
                <div className="log-details">
                  {Object.entries(log).map(([key, value]) => {
                    if (key === 'day') return null;
                    return (
                      <span key={key} className="log-detail-item">
                        <strong>{key}:</strong> {value}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-logs">No logs yet. Start this workout to create your first log!</p>
        )}
      </div>

      {workout.type === 'strength' && (
        <div className="workout-tips">
          <h3>💡 Tips for Strength Training</h3>
          <ul>
            <li>Warm up for 5-10 minutes before starting</li>
            <li>Focus on proper form over heavy weights</li>
            <li>Rest 60-90 seconds between sets</li>
            <li>Stay hydrated throughout your workout</li>
          </ul>
        </div>
      )}

      {workout.type === 'cardio' && (
        <div className="workout-tips">
          <h3>💡 Tips for Cardio Training</h3>
          <ul>
            <li>Start with a light warm-up</li>
            <li>Monitor your heart rate</li>
            <li>Stay hydrated before, during, and after</li>
            <li>Cool down with light stretching</li>
          </ul>
        </div>
      )}
    </div>
  );
}
