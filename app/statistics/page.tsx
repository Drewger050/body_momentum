"use client";

import { useState, useEffect } from "react";
import { useWorkoutStore } from "@/lib/stores/workoutStore";
import { Trophy, TrendingUp, Dumbbell, Calendar, Calculator } from "lucide-react";
import { format, subDays, eachDayOfInterval } from "date-fns";

export default function StatisticsPage() {
  const { workouts, getPersonalRecords, getTotalVolume, getExerciseHistory } = useWorkoutStore();
  const [mounted, setMounted] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("month");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const personalRecords = getPersonalRecords();
  const totalVolume = getTotalVolume();

  // Calculate workout frequency
  const now = new Date();
  const periodDays = selectedPeriod === "week" ? 7 : selectedPeriod === "month" ? 30 : 365;
  const periodStart = subDays(now, periodDays);
  const periodWorkouts = workouts.filter(
    (w) => new Date(w.date) >= periodStart
  );

  // Volume by day for chart
  const days = eachDayOfInterval({ start: periodStart, end: now });
  const volumeByDay = days.map((day) => {
    const dayKey = format(day, "yyyy-MM-dd");
    const dayWorkouts = workouts.filter(
      (w) => format(new Date(w.date), "yyyy-MM-dd") === dayKey
    );

    const volume = dayWorkouts.reduce((total, workout) => {
      return (
        total +
        workout.exercises.reduce((exTotal, exercise) => {
          return (
            exTotal +
            exercise.sets.reduce((setTotal, set) => {
              return (
                setTotal +
                (set.weight && set.reps && set.completed
                  ? set.weight * set.reps
                  : 0)
              );
            }, 0)
          );
        }, 0)
      );
    }, 0);

    return {
      date: format(day, "MMM d"),
      volume,
    };
  });

  const maxVolume = Math.max(...volumeByDay.map((d) => d.volume), 1);

  // Calculate total sets and reps
  const totalSets = workouts.reduce(
    (acc, w) => acc + w.exercises.reduce((exAcc, ex) => exAcc + ex.sets.length, 0),
    0
  );

  const totalReps = workouts.reduce(
    (acc, w) =>
      acc +
      w.exercises.reduce(
        (exAcc, ex) =>
          exAcc +
          ex.sets.reduce((setAcc, set) => setAcc + (set.reps || 0), 0),
        0
      ),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Statistics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and personal records
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Workouts</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {workouts.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Sets</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalSets}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Reps</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalReps.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Volume (lbs)</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalVolume.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Volume Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Volume Over Time
            </h2>
            <div className="flex gap-2">
              {(["week", "month", "year"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                    selectedPeriod === period
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 flex items-end gap-1">
            {volumeByDay.map((day, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end group"
              >
                <div
                  className="w-full bg-blue-600 dark:bg-blue-500 rounded-t hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors relative"
                  style={{
                    height: `${(day.volume / maxVolume) * 100}%`,
                    minHeight: day.volume > 0 ? "4px" : "0",
                  }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {day.volume.toLocaleString()} lbs
                  </div>
                </div>
                {index % Math.ceil(volumeByDay.length / 7) === 0 && (
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {day.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Personal Records */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Personal Records
            </h2>
          </div>

          {personalRecords.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Trophy className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                No personal records yet
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                Complete workouts to track your PRs
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {personalRecords
                .sort((a, b) => b.oneRepMax - a.oneRepMax)
                .map((record) => (
                  <div
                    key={record.exerciseId}
                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {record.exerciseName}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(record.date), "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Best: </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {record.weight} lbs × {record.reps} reps
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-600 dark:text-gray-400">1RM: </span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {Math.round(record.oneRepMax)} lbs
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
          </div>

          <div className="px-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Last {periodDays} days
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {periodWorkouts.length} workouts
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Average per week</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {((periodWorkouts.length / periodDays) * 7).toFixed(1)} workouts
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Total volume (last {periodDays} days)
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {volumeByDay
                    .reduce((acc, day) => acc + day.volume, 0)
                    .toLocaleString()}{" "}
                  lbs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
