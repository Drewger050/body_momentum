"use client";

import { useState, useEffect } from "react";
import { useWorkoutStore } from "@/lib/stores/workoutStore";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { Calendar, Dumbbell, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const { workouts } = useWorkoutStore();
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const workoutsByDate = workouts.reduce((acc, workout) => {
    const date = format(new Date(workout.date), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(workout);
    return acc;
  }, {} as Record<string, typeof workouts>);

  const selectedWorkouts = workoutsByDate[format(selectedDate, "yyyy-MM-dd")] || [];

  const totalWorkouts = workouts.length;
  const thisWeekWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= weekStart && workoutDate <= weekEnd;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Workout History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {totalWorkouts} total workouts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Dumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {thisWeekWorkouts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalWorkouts}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
            </h2>
            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dateKey = format(day, "yyyy-MM-dd");
              const dayWorkouts = workoutsByDate[dateKey] || [];
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());

              return (
                <button
                  key={dateKey}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square rounded-lg p-2 flex flex-col items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : dayWorkouts.length > 0
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  } ${isToday ? "ring-2 ring-blue-600" : ""}`}
                >
                  <span className="text-xs font-medium mb-1">
                    {format(day, "EEE")}
                  </span>
                  <span className="text-lg font-bold">{format(day, "d")}</span>
                  {dayWorkouts.length > 0 && (
                    <div className="w-1 h-1 rounded-full bg-current mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Workouts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {format(selectedDate, "MMMM d, yyyy")}
            </h2>
          </div>

          {selectedWorkouts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Dumbbell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                No workouts on this day
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                Start a workout to track your progress
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {selectedWorkouts.map((workout) => (
                <Link
                  key={workout.id}
                  href={`/workouts/${workout.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {workout.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(workout.date), "h:mm a")}
                      </p>
                    </div>
                    {workout.duration && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{workout.duration} min</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{workout.exercises.length} exercises</span>
                    <span>
                      {workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0)} sets
                    </span>
                    <span>
                      {workout.exercises.reduce(
                        (acc, ex) =>
                          acc +
                          ex.sets.reduce(
                            (setAcc, set) => setAcc + (set.completed ? 1 : 0),
                            0
                          ),
                        0
                      )}{" "}
                      completed
                    </span>
                  </div>

                  {workout.exercises.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {workout.exercises.map((ex, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {ex.exerciseName}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
