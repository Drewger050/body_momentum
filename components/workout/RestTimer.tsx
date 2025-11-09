"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, X } from "lucide-react";

export function RestTimer() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [targetSeconds, setTargetSeconds] = useState(90);
  const [isMinimized, setIsMinimized] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (seconds >= targetSeconds && isActive) {
      // Play notification sound or vibrate
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  }, [seconds, targetSeconds, isActive]);

  const handleStart = () => {
    setIsActive(true);
    setIsMinimized(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const handleClose = () => {
    setIsActive(false);
    setSeconds(0);
    setIsMinimized(true);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = Math.min((seconds / targetSeconds) * 100, 100);
  const isOvertime = seconds > targetSeconds;

  if (isMinimized && !isActive && seconds === 0) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-24 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-40"
      >
        <Play className="w-6 h-6" />
      </button>
    );
  }

  if (isMinimized && (isActive || seconds > 0)) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className={`fixed bottom-24 right-4 ${
          isOvertime ? "bg-red-600" : "bg-blue-600"
        } text-white px-6 py-3 rounded-full shadow-lg z-40 font-bold text-lg`}
      >
        {formatTime(seconds)}
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-80 z-40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Rest Timer</h3>
        <button
          onClick={handleClose}
          className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-4">
        <div
          className={`text-5xl font-bold ${
            isOvertime
              ? "text-red-600 dark:text-red-400"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {formatTime(seconds)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Target: {formatTime(targetSeconds)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full transition-all ${
            isOvertime ? "bg-red-600" : "bg-blue-600"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Target Time Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rest Duration
        </label>
        <div className="flex gap-2">
          {[60, 90, 120, 180].map((time) => (
            <button
              key={time}
              onClick={() => setTargetSeconds(time)}
              className={`flex-1 py-2 rounded-lg font-medium ${
                targetSeconds === time
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {time / 60}m
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {isOvertime && (
        <div className="mt-4 text-center text-red-600 dark:text-red-400 font-medium">
          Rest time exceeded!
        </div>
      )}
    </div>
  );
}
