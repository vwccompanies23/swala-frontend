"use client";

import { useEffect, useRef, useState } from "react";
import AudioWaveform from "./AudioWaveform";

export default function VoiceRecorder({
  startRecording,
  stopRecording,
  recording,
}) {

  const startX = useRef(0);
  const startY = useRef(0);

  const [locked, setLocked] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {

    let interval;

    if (recording) {

      interval = setInterval(() => {

        setSeconds((prev) => prev + 1);

      }, 1000);

    } else {

      setSeconds(0);

    }

    return () => clearInterval(interval);

  }, [recording]);

  function handleStart(e) {

    const touch = e.touches[0];

    startX.current = touch.clientX;
    startY.current = touch.clientY;

    setCancelled(false);

    startRecording();

  }

  function handleMove(e) {

    const touch = e.touches[0];

    const moveX = touch.clientX;
    const moveY = touch.clientY;

    const diffX = startX.current - moveX;
    const diffY = startY.current - moveY;

    /* SWIPE LEFT = CANCEL */
    if (diffX > 120) {

      setCancelled(true);

      stopRecording(true);

    }

    /* SWIPE UP = LOCK */
    if (diffY > 120) {

      setLocked(true);

    }

  }

  function handleEnd() {

    if (!locked && !cancelled) {

      stopRecording(false);

    }

  }

  function stopLockedRecording() {

    stopRecording(false);

    setLocked(false);

  }

  return (

    <div className="flex items-center gap-4 w-full">

      {/* TIMER */}
      {recording && (

        <div className="text-red-500 font-bold min-w-[60px]">

          00:{seconds
            .toString()
            .padStart(2, "0")}

        </div>

      )}

      {/* LOCK BUTTON */}
      {locked && (

        <button
          onClick={stopLockedRecording}
          className="bg-red-600 px-4 py-2 rounded-full text-white font-medium"
        >
          Stop
        </button>

      )}

      {/* RECORD BUTTON */}
      {!locked && (

        <button
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className={`w-14 h-14 min-w-[56px] rounded-full text-2xl flex items-center justify-center transition-all duration-200 ${
            recording
              ? "bg-red-600 animate-pulse scale-110"
              : "bg-amber-700"
          }`}
        >
          🎤
        </button>

      )}

      {/* RECORDING AREA */}
      {recording && !locked && (

        <div className="flex items-center gap-4 flex-1">

          {/* REUSABLE WAVEFORM */}
          <AudioWaveform />

          {/* HINTS */}
          <div className="text-sm text-gray-400 leading-4">

            <p>⬅ Swipe left to cancel</p>

            <p>⬆ Swipe up to lock</p>

          </div>

        </div>

      )}

      {/* LOCKED RECORDING UI */}
      {locked && recording && (

        <div className="flex items-center gap-4 flex-1">

          <AudioWaveform />

          <p className="text-red-400 text-sm">
            Recording locked
          </p>

        </div>

      )}

      {/* CANCEL MESSAGE */}
      {cancelled && (

        <p className="text-red-500 text-sm animate-pulse">
          Recording cancelled
        </p>

      )}

    </div>

  );

}