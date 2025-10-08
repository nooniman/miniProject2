import { Link, useSearchParams } from 'react-router-dom';
import { workouts } from '../data/workouts';
import './WorkoutList.css';

export default function WorkoutList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get query parameters
  const query = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || '';

  // Filter workouts based on query params
  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(query.toLowerCase()) ||
                         workout.description.toLowerCase().includes(query.toLowerCase());
    const matchesType = !typeFilter || workout.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Update search query
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    
    if (newQuery) {
      newParams.set('q', newQuery);
    } else {
      newParams.delete('q');
    }
    
    setSearchParams(newParams);
  };

  // Update type filter
  const handleTypeChange = (type) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (type) {
      newParams.set('type', type);
    } else {
      newParams.delete('type');
    }
    
    setSearchParams(newParams);
  };

  return (
    <div className="workout-list-page">
      <div className="page-header">
        <h2>All Workouts</h2>
        <p>Find the perfect workout for your fitness goals</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search workouts..."
            value={query}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${!typeFilter ? 'active' : ''}`}
            onClick={() => handleTypeChange('')}
          >
            All
          </button>
          <button
            className={`filter-btn ${typeFilter === 'cardio' ? 'active' : ''}`}
            onClick={() => handleTypeChange('cardio')}
          >
            Cardio
          </button>
          <button
            className={`filter-btn ${typeFilter === 'strength' ? 'active' : ''}`}
            onClick={() => handleTypeChange('strength')}
          >
            Strength
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        <p>Found {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Workouts Grid */}
      <div className="workouts-grid">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map(workout => (
            <Link
              key={workout.id}
              to={`/workouts/${workout.id}`}
              className="workout-card"
            >
              <div className="workout-type-badge">
                {workout.type === 'cardio' ? '🏃' : '💪'} {workout.type}
              </div>
              <h3>{workout.name}</h3>
              <p className="workout-description">{workout.description}</p>
              <div className="workout-meta">
                <span>⏱️ {workout.duration} min</span>
                <span>🔥 {workout.calories} cal</span>
                <span className={`difficulty ${workout.difficulty}`}>
                  {workout.difficulty}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <p>No workouts found matching your criteria.</p>
            <button
              className="btn btn-primary"
              onClick={() => setSearchParams({})}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
