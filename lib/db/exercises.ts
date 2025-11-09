import { Exercise, MuscleGroup } from "@/types";

export const defaultExercises: Exercise[] = [
  // Chest
  {
    id: "bench-press",
    name: "Barbell Bench Press",
    type: "strength",
    muscleGroup: "chest",
    equipment: "Barbell",
    instructions: "Lie on bench, grip bar slightly wider than shoulder width, lower to chest, press up",
    isCustom: false,
  },
  {
    id: "incline-bench-press",
    name: "Incline Bench Press",
    type: "strength",
    muscleGroup: "chest",
    equipment: "Barbell",
    instructions: "Set bench to 30-45 degrees, perform bench press on incline",
    isCustom: false,
  },
  {
    id: "dumbbell-flyes",
    name: "Dumbbell Flyes",
    type: "strength",
    muscleGroup: "chest",
    equipment: "Dumbbells",
    instructions: "Lie on bench, arms extended with slight bend, lower dumbbells in arc motion",
    isCustom: false,
  },
  {
    id: "push-ups",
    name: "Push Ups",
    type: "strength",
    muscleGroup: "chest",
    equipment: "Bodyweight",
    instructions: "Hands shoulder-width apart, lower body until chest nearly touches ground, push back up",
    isCustom: false,
  },

  // Back
  {
    id: "deadlift",
    name: "Deadlift",
    type: "strength",
    muscleGroup: "back",
    equipment: "Barbell",
    instructions: "Feet hip-width, bend at hips and knees, grip bar, lift by extending hips and knees",
    isCustom: false,
  },
  {
    id: "pull-ups",
    name: "Pull Ups",
    type: "strength",
    muscleGroup: "back",
    equipment: "Pull-up Bar",
    instructions: "Hang from bar, pull body up until chin over bar, lower with control",
    isCustom: false,
  },
  {
    id: "barbell-row",
    name: "Barbell Row",
    type: "strength",
    muscleGroup: "back",
    equipment: "Barbell",
    instructions: "Bend at hips, pull bar to lower chest, squeeze shoulder blades together",
    isCustom: false,
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    type: "strength",
    muscleGroup: "back",
    equipment: "Cable Machine",
    instructions: "Grip bar wide, pull down to upper chest, control on the way up",
    isCustom: false,
  },

  // Shoulders
  {
    id: "overhead-press",
    name: "Overhead Press",
    type: "strength",
    muscleGroup: "shoulders",
    equipment: "Barbell",
    instructions: "Press bar overhead from shoulders, lock out arms at top",
    isCustom: false,
  },
  {
    id: "lateral-raises",
    name: "Lateral Raises",
    type: "strength",
    muscleGroup: "shoulders",
    equipment: "Dumbbells",
    instructions: "Arms at sides, raise dumbbells to shoulder height, lower with control",
    isCustom: false,
  },
  {
    id: "face-pulls",
    name: "Face Pulls",
    type: "strength",
    muscleGroup: "shoulders",
    equipment: "Cable Machine",
    instructions: "Pull rope to face level, separate hands, squeeze shoulder blades",
    isCustom: false,
  },

  // Legs
  {
    id: "squat",
    name: "Barbell Squat",
    type: "strength",
    muscleGroup: "quads",
    equipment: "Barbell",
    instructions: "Bar on upper back, descend until thighs parallel, drive through heels",
    isCustom: false,
  },
  {
    id: "leg-press",
    name: "Leg Press",
    type: "strength",
    muscleGroup: "quads",
    equipment: "Leg Press Machine",
    instructions: "Feet shoulder-width on platform, lower until 90 degrees, press back up",
    isCustom: false,
  },
  {
    id: "lunges",
    name: "Lunges",
    type: "strength",
    muscleGroup: "quads",
    equipment: "Dumbbells",
    instructions: "Step forward, lower until both knees at 90 degrees, push back to start",
    isCustom: false,
  },
  {
    id: "leg-curl",
    name: "Leg Curl",
    type: "strength",
    muscleGroup: "hamstrings",
    equipment: "Leg Curl Machine",
    instructions: "Lie face down, curl legs toward glutes, lower with control",
    isCustom: false,
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    type: "strength",
    muscleGroup: "hamstrings",
    equipment: "Barbell",
    instructions: "Slight knee bend, hinge at hips, lower bar along legs, feel hamstring stretch",
    isCustom: false,
  },
  {
    id: "calf-raises",
    name: "Calf Raises",
    type: "strength",
    muscleGroup: "calves",
    equipment: "Machine or Bodyweight",
    instructions: "Rise up on toes, squeeze calves at top, lower with control",
    isCustom: false,
  },

  // Arms
  {
    id: "barbell-curl",
    name: "Barbell Curl",
    type: "strength",
    muscleGroup: "biceps",
    equipment: "Barbell",
    instructions: "Curl bar to shoulders, keep elbows stationary, lower with control",
    isCustom: false,
  },
  {
    id: "hammer-curl",
    name: "Hammer Curl",
    type: "strength",
    muscleGroup: "biceps",
    equipment: "Dumbbells",
    instructions: "Neutral grip, curl dumbbells to shoulders, lower with control",
    isCustom: false,
  },
  {
    id: "tricep-dips",
    name: "Tricep Dips",
    type: "strength",
    muscleGroup: "triceps",
    equipment: "Dip Bar",
    instructions: "Lower body until upper arms parallel to ground, push back up",
    isCustom: false,
  },
  {
    id: "tricep-pushdown",
    name: "Tricep Pushdown",
    type: "strength",
    muscleGroup: "triceps",
    equipment: "Cable Machine",
    instructions: "Push cable down, lock out arms, return to start with control",
    isCustom: false,
  },

  // Core
  {
    id: "plank",
    name: "Plank",
    type: "duration",
    muscleGroup: "core",
    equipment: "Bodyweight",
    instructions: "Forearms and toes on ground, keep body straight, hold position",
    isCustom: false,
  },
  {
    id: "crunches",
    name: "Crunches",
    type: "strength",
    muscleGroup: "core",
    equipment: "Bodyweight",
    instructions: "Lie on back, lift shoulders off ground, squeeze abs, lower with control",
    isCustom: false,
  },
  {
    id: "russian-twists",
    name: "Russian Twists",
    type: "strength",
    muscleGroup: "core",
    equipment: "Dumbbell or Plate",
    instructions: "Sit with feet elevated, rotate torso side to side with weight",
    isCustom: false,
  },

  // Cardio
  {
    id: "running",
    name: "Running",
    type: "cardio",
    muscleGroup: "cardio",
    equipment: "Treadmill or Outdoor",
    instructions: "Maintain steady pace, monitor heart rate",
    isCustom: false,
  },
  {
    id: "cycling",
    name: "Cycling",
    type: "cardio",
    muscleGroup: "cardio",
    equipment: "Bike",
    instructions: "Maintain steady cadence and resistance",
    isCustom: false,
  },
  {
    id: "rowing",
    name: "Rowing",
    type: "cardio",
    muscleGroup: "cardio",
    equipment: "Rowing Machine",
    instructions: "Drive with legs, pull handle to chest, extend arms and legs back",
    isCustom: false,
  },
];

export function getExercisesByMuscleGroup(muscleGroup: MuscleGroup): Exercise[] {
  return defaultExercises.filter((ex) => ex.muscleGroup === muscleGroup);
}

export function searchExercises(query: string): Exercise[] {
  const lowerQuery = query.toLowerCase();
  return defaultExercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(lowerQuery) ||
      ex.muscleGroup.toLowerCase().includes(lowerQuery) ||
      ex.equipment?.toLowerCase().includes(lowerQuery)
  );
}
