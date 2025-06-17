"use client";
import React, { useState, useEffect, useRef, use } from "react";
import "./style.css";

export default function Challenge8() {
  const [progress, setProgress] = useState<number>(0);
  const timeOut = useRef<NodeJS.Timeout>(undefined);
  const [clicked, setClicked] = useState<boolean>(false);
  const time = 500;

  const addToBar = (value: number) => {
    console.log(value);
    if (value >= 90) {
      clearInterval(timeOut.current);
    }
    return value + 10;
  };

  const startBar = () => {
    if (clicked) return;
    setClicked(true);
    timeOut.current = setInterval(() => {
      setProgress((prev) => addToBar(prev));
    }, time);
  };

  return (
    <div className="container">
      <div className="progressbar-container">
        <div
          style={{ width: `calc(${progress}% - 10px` }}
          className="progressbar-container-bar"
        ></div>
      </div>
      <button className="btn-start" onClick={startBar}>
        start
      </button>
    </div>
  );
}
