import { createContext, useContext, useState, useEffect } from 'react';
import { workouts as initialWorkouts } from '../data/workouts';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);

  // Load workouts from localStorage or use initial data
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('fitnessTrackerWorkouts');
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    } else {
      setWorkouts(initialWorkouts);
    }
  }, []);

  // Save workouts to localStorage whenever they change
  useEffect(() => {
    if (workouts.length > 0) {
      localStorage.setItem('fitnessTrackerWorkouts', JSON.stringify(workouts));
    }
  }, [workouts]);

  // Add a new workout
  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Math.max(...workouts.map(w => w.id), 0) + 1,
      logs: []
    };
    setWorkouts([...workouts, newWorkout]);
    return newWorkout.id;
  };

  // Update an existing workout
  const updateWorkout = (id, updatedData) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? { ...workout, ...updatedData } : workout
    ));
  };

  // Delete a workout
  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  // Add a log to a workout
  const addLog = (workoutId, log) => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          logs: [...workout.logs, log]
        };
      }
      return workout;
    }));
  };

  // Update a log in a workout
  const updateLog = (workoutId, logIndex, updatedLog) => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        const newLogs = [...workout.logs];
        newLogs[logIndex] = updatedLog;
        return {
          ...workout,
          logs: newLogs
        };
      }
      return workout;
    }));
  };

  // Delete a log from a workout
  const deleteLog = (workoutId, logIndex) => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          logs: workout.logs.filter((_, index) => index !== logIndex)
        };
      }
      return workout;
    }));
  };

  // Reset to initial data
  const resetWorkouts = () => {
    setWorkouts(initialWorkouts);
    localStorage.removeItem('fitnessTrackerWorkouts');
  };

  const value = {
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    addLog,
    updateLog,
    deleteLog,
    resetWorkouts
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
}
