"use client";

import { useEffect, useState } from "react";
import { Play, TrendingUp, History, Dumbbell } from "lucide-react";
import Link from "next/link";
import { useWorkoutStore } from "@/lib/stores/workoutStore";
import { format } from "date-fns";

export default function Home() {
  const { workouts, getRecentWorkouts } = useWorkoutStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const recentWorkouts = getRecentWorkouts(5);
  const totalWorkouts = workouts.length;
  const thisWeekWorkouts = workouts.filter(w => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(w.date) >= weekAgo;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Body Momentum
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your personal workout companion
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Total Workouts
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalWorkouts}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Dumbbell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  This Week
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {thisWeekWorkouts}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Start Workout Button */}
        <Link href="/workouts/new">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-6 rounded-xl shadow-lg mb-8 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]">
            <Play className="w-6 h-6 fill-current" />
            <span className="text-xl">Start Empty Workout</span>
          </button>
        </Link>

        {/* Recent Workouts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5" />
              Recent Workouts
            </h2>
          </div>

          {recentWorkouts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Dumbbell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                No workouts yet
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                Start your first workout to see it here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentWorkouts.map((workout) => (
                <Link
                  key={workout.id}
                  href={`/workouts/${workout.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {workout.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.exercises.length} exercises • {workout.duration || "0"} min
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(workout.date), "MMM d, yyyy")}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {format(new Date(workout.date), "h:mm a")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Link href="/exercises">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <Dumbbell className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Exercises
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse exercise library
              </p>
            </div>
          </Link>

          <Link href="/statistics">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Statistics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your progress
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
