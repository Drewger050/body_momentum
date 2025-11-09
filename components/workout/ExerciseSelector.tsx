"use client";

import { useState, useEffect } from "react";
import { X, Search, Dumbbell } from "lucide-react";
import { useWorkoutStore } from "@/lib/stores/workoutStore";
import { defaultExercises } from "@/lib/db/exercises";
import { Exercise, MuscleGroup } from "@/types";

interface ExerciseSelectorProps {
  onClose: () => void;
}

const muscleGroups: MuscleGroup[] = [
  "chest", "back", "shoulders", "biceps", "triceps", "forearms",
  "core", "quads", "hamstrings", "glutes", "calves", "cardio"
];

export function ExerciseSelector({ onClose }: ExerciseSelectorProps) {
  const { exercises: customExercises, addExerciseToWorkout } = useWorkoutStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | "all">("all");
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    setAllExercises([...defaultExercises, ...customExercises]);
  }, [customExercises]);

  const filteredExercises = allExercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscleGroup = selectedMuscleGroup === "all" || exercise.muscleGroup === selectedMuscleGroup;
    return matchesSearch && matchesMuscleGroup;
  });

  const handleSelectExercise = (exercise: Exercise) => {
    addExerciseToWorkout({
      id: Date.now().toString(),
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Select Exercise
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercises..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Muscle Group Filter */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMuscleGroup("all")}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                selectedMuscleGroup === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              All
            </button>
            {muscleGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedMuscleGroup(group)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap capitalize ${
                  selectedMuscleGroup === group
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex-1 overflow-y-auto">
          {filteredExercises.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Dumbbell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No exercises found
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredExercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => handleSelectExercise(exercise)}
                  className="w-full px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {exercise.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="capitalize">{exercise.muscleGroup}</span>
                        {exercise.equipment && (
                          <>
                            <span>•</span>
                            <span>{exercise.equipment}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {exercise.isCustom && (
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded">
                        Custom
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
