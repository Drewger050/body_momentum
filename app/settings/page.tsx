"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useWorkoutStore } from "@/lib/stores/workoutStore";
import { Moon, Sun, Download, Trash2, Database, Info } from "lucide-react";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { workouts, exercises, bodyMeasurements } = useWorkoutStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExportData = () => {
    // Export workouts as CSV
    const headers = [
      "Date",
      "Workout Name",
      "Exercise",
      "Set Number",
      "Weight (lbs)",
      "Reps",
      "Tag",
      "Completed",
    ];

    const rows = workouts.flatMap((workout) =>
      workout.exercises.flatMap((exercise) =>
        exercise.sets.map((set, index) => [
          new Date(workout.date).toISOString(),
          workout.name,
          exercise.exerciseName,
          index + 1,
          set.weight || 0,
          set.reps || 0,
          set.tag,
          set.completed ? "Yes" : "No",
        ])
      )
    );

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `body-momentum-export-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (
      confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  if (!mounted) return null;

  const dataSize = new Blob([
    JSON.stringify({ workouts, exercises, bodyMeasurements }),
  ]).size;
  const dataSizeKB = (dataSize / 1024).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your preferences and data
          </p>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  theme === "dark" ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    theme === "dark" ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Data Management
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {/* Export Data */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Export Data
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download your workout data as CSV
                  </p>
                </div>
              </div>
              <button
                onClick={handleExportData}
                disabled={workouts.length === 0}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                Export
              </button>
            </div>

            {/* Clear Data */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Clear All Data
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Permanently delete all your data
                  </p>
                </div>
              </div>
              <button
                onClick={handleClearData}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Storage Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Storage
            </h2>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Workouts</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {workouts.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Custom Exercises</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {exercises.filter((e) => e.isCustom).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Body Measurements</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {bodyMeasurements.length}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Data Size</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {dataSizeKB} KB
              </span>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              About
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Body Momentum
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Version 1.0.0
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A comprehensive workout tracking application inspired by Strong. Track your workouts, monitor your progress, and achieve your fitness goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
