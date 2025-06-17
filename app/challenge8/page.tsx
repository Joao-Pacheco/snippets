"use client";
import React, { useState, useEffect, useRef } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = () => {
    if (isRunning) return;
    setProgress(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;

    const totalDuration = 3000; // 3 segundos
    const stepTime = 100; // atualiza a cada 100ms
    const increment = 100 / (totalDuration / stepTime); // quanto aumenta por passo

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          setIsRunning(false);
          return 100;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div style={{ width: 300, margin: "50px auto", fontFamily: "sans-serif" }}>
      <h3>🚀 Uber Progress Bar</h3>

      <div
        style={{
          height: 24,
          width: "100%",
          backgroundColor: "#eee",
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#007bff",
            transition: "width 100ms linear",
          }}
        />
      </div>

      <button onClick={startProgress} disabled={isRunning}>
        {isRunning ? "Running..." : "Start Progress"}
      </button>
    </div>
  );
}
