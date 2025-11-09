export type ExerciseType = "strength" | "cardio" | "duration" | "assisted_bodyweight";

export type MuscleGroup =
  | "chest" | "back" | "shoulders" | "biceps" | "triceps" | "forearms"
  | "core" | "quads" | "hamstrings" | "glutes" | "calves" | "cardio" | "full_body";

export type SetTag = "normal" | "warmup" | "failure" | "dropset";

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  muscleGroup: MuscleGroup;
  equipment?: string;
  instructions?: string;
  isCustom: boolean;
}

export interface WorkoutSet {
  id: string;
  weight?: number;
  reps?: number;
  duration?: number; // in seconds
  distance?: number; // in km
  rpe?: number; // Rate of Perceived Exertion (1-10)
  tag: SetTag;
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
  notes?: string;
  superset?: string; // ID of superset group
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  duration?: number; // in minutes
  exercises: WorkoutExercise[];
  notes?: string;
  completed: boolean;
}

export interface Routine {
  id: string;
  name: string;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    sets: number;
    reps?: number;
    weight?: number;
  }[];
  createdAt: string;
  lastUsed?: string;
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
  date: string;
  oneRepMax: number;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
    calves?: number;
  };
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalVolume: number;
  totalSets: number;
  totalReps: number;
  personalRecords: PersonalRecord[];
  workoutsByMonth: { month: string; count: number }[];
  volumeByWeek: { week: string; volume: number }[];
}
