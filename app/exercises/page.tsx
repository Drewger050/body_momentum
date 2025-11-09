"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Dumbbell, Edit, Trash2 } from "lucide-react";
import { defaultExercises } from "@/lib/db/exercises";
import { useWorkoutStore } from "@/lib/stores/workoutStore";
import { Exercise, MuscleGroup } from "@/types";

const muscleGroups: MuscleGroup[] = [
  "chest", "back", "shoulders", "biceps", "triceps", "forearms",
  "core", "quads", "hamstrings", "glutes", "calves", "cardio"
];

export default function ExercisesPage() {
  const { exercises: customExercises } = useWorkoutStore();
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

  const groupedExercises = filteredExercises.reduce((acc, exercise) => {
    if (!acc[exercise.muscleGroup]) {
      acc[exercise.muscleGroup] = [];
    }
    acc[exercise.muscleGroup].push(exercise);
    return acc;
  }, {} as Record<MuscleGroup, Exercise[]>);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Exercise Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {allExercises.length} exercises available
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercises..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Muscle Group Filter */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedMuscleGroup("all")}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                selectedMuscleGroup === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
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
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise List */}
        {filteredExercises.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
            <Dumbbell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No exercises found
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedExercises).map(([muscleGroup, exercises]) => (
              <div key={muscleGroup}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 capitalize">
                  {muscleGroup} ({exercises.length})
                </h2>
                <div className="grid gap-3">
                  {exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {exercise.name}
                            </h3>
                            {exercise.isCustom && (
                              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded">
                                Custom
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span className="capitalize">{exercise.type}</span>
                            {exercise.equipment && (
                              <>
                                <span>•</span>
                                <span>{exercise.equipment}</span>
                              </>
                            )}
                          </div>
                          {exercise.instructions && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {exercise.instructions}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
