import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Workout, WorkoutExercise, WorkoutSet, Exercise, Routine, BodyMeasurement, PersonalRecord } from "@/types";

interface WorkoutStore {
  workouts: Workout[];
  exercises: Exercise[];
  routines: Routine[];
  bodyMeasurements: BodyMeasurement[];
  currentWorkout: Workout | null;

  // Workout actions
  addWorkout: (workout: Workout) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  getWorkout: (id: string) => Workout | undefined;
  getRecentWorkouts: (limit: number) => Workout[];

  // Current workout actions
  startWorkout: (name: string) => void;
  finishWorkout: () => void;
  cancelWorkout: () => void;
  addExerciseToWorkout: (exercise: WorkoutExercise) => void;
  removeExerciseFromWorkout: (exerciseId: string) => void;
  updateExerciseInWorkout: (exerciseId: string, exercise: Partial<WorkoutExercise>) => void;
  addSetToExercise: (exerciseId: string, set: WorkoutSet) => void;
  updateSetInExercise: (exerciseId: string, setId: string, set: Partial<WorkoutSet>) => void;
  deleteSetFromExercise: (exerciseId: string, setId: string) => void;

  // Exercise actions
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, exercise: Partial<Exercise>) => void;
  deleteExercise: (id: string) => void;
  getExercise: (id: string) => Exercise | undefined;

  // Routine actions
  addRoutine: (routine: Routine) => void;
  updateRoutine: (id: string, routine: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  getRoutine: (id: string) => Routine | undefined;

  // Body measurements
  addBodyMeasurement: (measurement: BodyMeasurement) => void;
  updateBodyMeasurement: (id: string, measurement: Partial<BodyMeasurement>) => void;
  deleteBodyMeasurement: (id: string) => void;

  // Statistics
  getPersonalRecords: () => PersonalRecord[];
  getTotalVolume: () => number;
  getExerciseHistory: (exerciseId: string) => { date: string; weight: number; reps: number }[];
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      workouts: [],
      exercises: [],
      routines: [],
      bodyMeasurements: [],
      currentWorkout: null,

      // Workout actions
      addWorkout: (workout) => set((state) => ({
        workouts: [workout, ...state.workouts]
      })),

      updateWorkout: (id, workout) => set((state) => ({
        workouts: state.workouts.map((w) => w.id === id ? { ...w, ...workout } : w)
      })),

      deleteWorkout: (id) => set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id)
      })),

      getWorkout: (id) => get().workouts.find((w) => w.id === id),

      getRecentWorkouts: (limit) => get().workouts.slice(0, limit),

      // Current workout actions
      startWorkout: (name) => set({
        currentWorkout: {
          id: Date.now().toString(),
          name,
          date: new Date().toISOString(),
          exercises: [],
          completed: false,
        }
      }),

      finishWorkout: () => set((state) => {
        if (!state.currentWorkout) return state;

        const finishedWorkout = {
          ...state.currentWorkout,
          completed: true,
        };

        return {
          workouts: [finishedWorkout, ...state.workouts],
          currentWorkout: null,
        };
      }),

      cancelWorkout: () => set({ currentWorkout: null }),

      addExerciseToWorkout: (exercise) => set((state) => {
        if (!state.currentWorkout) return state;

        return {
          currentWorkout: {
            ...state.currentWorkout,
            exercises: [...state.currentWorkout.exercises, exercise],
          }
        };
      }),

      removeExerciseFromWorkout: (exerciseId) => set((state) => {
        if (!state.currentWorkout) return state;

        return {
          currentWorkout: {
            ...state.currentWorkout,
            exercises: state.currentWorkout.exercises.filter((e) => e.id !== exerciseId),
          }
        };
      }),

      updateExerciseInWorkout: (exerciseId, exercise) => set((state) => {
        if (!state.currentWorkout) return state;

        return {
          currentWorkout: {
            ...state.currentWorkout,
            exercises: state.currentWorkout.exercises.map((e) =>
              e.id === exerciseId ? { ...e, ...exercise } : e
            ),
          }
        };
      }),

      addSetToExercise: (exerciseId, set) => {
        const state = get();
        if (!state.currentWorkout) return;

        const updatedExercises = state.currentWorkout.exercises.map((e) => {
          if (e.id === exerciseId) {
            return { ...e, sets: [...e.sets, set] };
          }
          return e;
        });

        get().updateExerciseInWorkout(exerciseId, {
          sets: updatedExercises.find(e => e.id === exerciseId)?.sets
        });
      },

      updateSetInExercise: (exerciseId, setId, setData) => set((state) => {
        if (!state.currentWorkout) return state;

        return {
          currentWorkout: {
            ...state.currentWorkout,
            exercises: state.currentWorkout.exercises.map((e) => {
              if (e.id === exerciseId) {
                return {
                  ...e,
                  sets: e.sets.map((s) => s.id === setId ? { ...s, ...setData } : s),
                };
              }
              return e;
            }),
          }
        };
      }),

      deleteSetFromExercise: (exerciseId, setId) => set((state) => {
        if (!state.currentWorkout) return state;

        return {
          currentWorkout: {
            ...state.currentWorkout,
            exercises: state.currentWorkout.exercises.map((e) => {
              if (e.id === exerciseId) {
                return {
                  ...e,
                  sets: e.sets.filter((s) => s.id !== setId),
                };
              }
              return e;
            }),
          }
        };
      }),

      // Exercise actions
      addExercise: (exercise) => set((state) => ({
        exercises: [...state.exercises, exercise]
      })),

      updateExercise: (id, exercise) => set((state) => ({
        exercises: state.exercises.map((e) => e.id === id ? { ...e, ...exercise } : e)
      })),

      deleteExercise: (id) => set((state) => ({
        exercises: state.exercises.filter((e) => e.id !== id)
      })),

      getExercise: (id) => get().exercises.find((e) => e.id === id),

      // Routine actions
      addRoutine: (routine) => set((state) => ({
        routines: [...state.routines, routine]
      })),

      updateRoutine: (id, routine) => set((state) => ({
        routines: state.routines.map((r) => r.id === id ? { ...r, ...routine } : r)
      })),

      deleteRoutine: (id) => set((state) => ({
        routines: state.routines.filter((r) => r.id !== id)
      })),

      getRoutine: (id) => get().routines.find((r) => r.id === id),

      // Body measurements
      addBodyMeasurement: (measurement) => set((state) => ({
        bodyMeasurements: [...state.bodyMeasurements, measurement]
      })),

      updateBodyMeasurement: (id, measurement) => set((state) => ({
        bodyMeasurements: state.bodyMeasurements.map((m) =>
          m.id === id ? { ...m, ...measurement } : m
        )
      })),

      deleteBodyMeasurement: (id) => set((state) => ({
        bodyMeasurements: state.bodyMeasurements.filter((m) => m.id !== id)
      })),

      // Statistics
      getPersonalRecords: () => {
        const workouts = get().workouts;
        const records: Map<string, PersonalRecord> = new Map();

        workouts.forEach((workout) => {
          workout.exercises.forEach((exercise) => {
            exercise.sets.forEach((set) => {
              if (set.weight && set.reps && set.completed) {
                const oneRepMax = set.weight * (1 + set.reps / 30);
                const key = exercise.exerciseId;
                const existing = records.get(key);

                if (!existing || oneRepMax > existing.oneRepMax) {
                  records.set(key, {
                    exerciseId: exercise.exerciseId,
                    exerciseName: exercise.exerciseName,
                    weight: set.weight,
                    reps: set.reps,
                    date: workout.date,
                    oneRepMax,
                  });
                }
              }
            });
          });
        });

        return Array.from(records.values());
      },

      getTotalVolume: () => {
        const workouts = get().workouts;
        let totalVolume = 0;

        workouts.forEach((workout) => {
          workout.exercises.forEach((exercise) => {
            exercise.sets.forEach((set) => {
              if (set.weight && set.reps && set.completed) {
                totalVolume += set.weight * set.reps;
              }
            });
          });
        });

        return totalVolume;
      },

      getExerciseHistory: (exerciseId) => {
        const workouts = get().workouts;
        const history: { date: string; weight: number; reps: number }[] = [];

        workouts.forEach((workout) => {
          workout.exercises.forEach((exercise) => {
            if (exercise.exerciseId === exerciseId) {
              exercise.sets.forEach((set) => {
                if (set.weight && set.reps && set.completed) {
                  history.push({
                    date: workout.date,
                    weight: set.weight,
                    reps: set.reps,
                  });
                }
              });
            }
          });
        });

        return history.sort((a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      },
    }),
    {
      name: "body-momentum-storage",
    }
  )
);
