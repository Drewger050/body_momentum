"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkoutStore } from "@/lib/stores/workoutStore";
import { X, Plus, Clock, Check, Trash2 } from "lucide-react";
import { ExerciseSelector } from "@/components/workout/ExerciseSelector";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { RestTimer } from "@/components/workout/RestTimer";

export default function NewWorkoutPage() {
  const router = useRouter();
  const { currentWorkout, startWorkout, finishWorkout, cancelWorkout } = useWorkoutStore();
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [showNameDialog, setShowNameDialog] = useState(true);
  const [startTime] = useState(new Date());

  useEffect(() => {
    if (!currentWorkout && !showNameDialog) {
      router.push("/");
    }
  }, [currentWorkout, showNameDialog, router]);

  const handleStartWorkout = () => {
    if (workoutName.trim()) {
      startWorkout(workoutName);
      setShowNameDialog(false);
    }
  };

  const handleFinishWorkout = () => {
    if (currentWorkout) {
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60);
      finishWorkout();
      router.push("/");
    }
  };

  const handleCancelWorkout = () => {
    if (confirm("Are you sure you want to cancel this workout? All progress will be lost.")) {
      cancelWorkout();
      router.push("/");
    }
  };

  if (showNameDialog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Start Workout
          </h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Workout Name
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStartWorkout()}
              placeholder="e.g. Upper Body, Leg Day..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/")}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleStartWorkout}
              disabled={!workoutName.trim()}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentWorkout) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentWorkout.name}
            </h1>
            <button
              onClick={handleCancelWorkout}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{Math.round((new Date().getTime() - startTime.getTime()) / 1000 / 60)} min</span>
            </div>
            <div>{currentWorkout.exercises.length} exercises</div>
            <div>
              {currentWorkout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0)} sets
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Exercises */}
        {currentWorkout.exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}

        {/* Add Exercise Button */}
        <button
          onClick={() => setShowExerciseSelector(true)}
          className="w-full bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl py-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Exercise
        </button>

        {/* Finish Workout Button */}
        {currentWorkout.exercises.length > 0 && (
          <button
            onClick={handleFinishWorkout}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <Check className="w-5 h-5" />
            Finish Workout
          </button>
        )}
      </div>

      {/* Exercise Selector Modal */}
      {showExerciseSelector && (
        <ExerciseSelector onClose={() => setShowExerciseSelector(false)} />
      )}

      {/* Rest Timer */}
      <RestTimer />
    </div>
  );
}
