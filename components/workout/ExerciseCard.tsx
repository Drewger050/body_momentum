"use client";

import { useState } from "react";
import { WorkoutExercise, WorkoutSet, SetTag } from "@/types";
import { useWorkoutStore } from "@/lib/stores/workoutStore";
import { Trash2, Plus, Check, X, MoreVertical } from "lucide-react";

interface ExerciseCardProps {
  exercise: WorkoutExercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const {
    removeExerciseFromWorkout,
    addSetToExercise,
    updateSetInExercise,
    deleteSetFromExercise,
  } = useWorkoutStore();

  const [showMenu, setShowMenu] = useState(false);

  const handleAddSet = () => {
    const lastSet = exercise.sets[exercise.sets.length - 1];
    const newSet: WorkoutSet = {
      id: Date.now().toString(),
      weight: lastSet?.weight || 0,
      reps: lastSet?.reps || 0,
      tag: "normal",
      completed: false,
    };
    addSetToExercise(exercise.id, newSet);
  };

  const handleSetChange = (setId: string, field: keyof WorkoutSet, value: any) => {
    updateSetInExercise(exercise.id, setId, { [field]: value });
  };

  const handleDeleteSet = (setId: string) => {
    deleteSetFromExercise(exercise.id, setId);
  };

  const handleToggleSetComplete = (setId: string, completed: boolean) => {
    updateSetInExercise(exercise.id, setId, { completed: !completed });
  };

  const getTagColor = (tag: SetTag) => {
    switch (tag) {
      case "warmup":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "failure":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      case "dropset":
        return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4 overflow-hidden">
      {/* Exercise Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {exercise.exerciseName}
        </h3>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
              <button
                onClick={() => {
                  removeExerciseFromWorkout(exercise.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove Exercise
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sets Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                Set
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                Weight (lbs)
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                Reps
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                Tag
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                Done
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {exercise.sets.map((set, index) => (
              <tr
                key={set.id}
                className={`${
                  set.completed ? "bg-green-50 dark:bg-green-900/20" : ""
                }`}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={set.weight || ""}
                    onChange={(e) =>
                      handleSetChange(set.id, "weight", parseFloat(e.target.value) || 0)
                    }
                    className="w-20 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    disabled={set.completed}
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={set.reps || ""}
                    onChange={(e) =>
                      handleSetChange(set.id, "reps", parseInt(e.target.value) || 0)
                    }
                    className="w-20 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    disabled={set.completed}
                  />
                </td>
                <td className="px-4 py-3">
                  <select
                    value={set.tag}
                    onChange={(e) =>
                      handleSetChange(set.id, "tag", e.target.value as SetTag)
                    }
                    className={`px-2 py-1 rounded text-xs font-medium ${getTagColor(
                      set.tag
                    )}`}
                    disabled={set.completed}
                  >
                    <option value="normal">Normal</option>
                    <option value="warmup">Warm Up</option>
                    <option value="failure">Failure</option>
                    <option value="dropset">Drop Set</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleSetComplete(set.id, set.completed)}
                    className={`p-1 rounded ${
                      set.completed
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDeleteSet(set.id)}
                    className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Set Button */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleAddSet}
          className="w-full py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Set
        </button>
      </div>
    </div>
  );
}
