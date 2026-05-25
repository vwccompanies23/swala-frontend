"use client";

import { useEffect, useState } from "react";

import CallControls from "./CallControls";

import useNetworkStatus from "../hooks/useNetworkStatus";

export default function VideoCallScreen({
  chat,
  endCall,
}) {

  const [muted,
    setMuted] =
      useState(false);

  const [videoEnabled,
    setVideoEnabled] =
      useState(true);

  const [connectionStatus,
    setConnectionStatus] =
      useState("Connecting...");

  const [screenSharing,
    setScreenSharing] =
      useState(false);

      const [callSeconds,
  setCallSeconds] =
    useState(0);

const [recording,
  setRecording] =
    useState(false);

    const [minimized,
  setMinimized] =
    useState(false);

  const [activeSpeaker,
    setActiveSpeaker] =
      useState("Heri");

  const [participants] =
    useState([
      {
        id: 1,
        name: "Heri",
      },

      {
        id: 2,
        name: "Sarah",
      },

      {
        id: 3,
        name: "Mike",
      },

      {
        id: 4,
        name: "David",
      },

      {
        id: 5,
        name: "Sophia",
      },
    ]);

  const {
    isOnline,
    connectionType,
  } = useNetworkStatus();

  const [lowBandwidthMode,
  setLowBandwidthMode] =
    useState(false);

    /* AUTO LOW INTERNET MODE */

useEffect(() => {

  if (
    connectionType === "2g" ||
    connectionType === "slow-2g"
  ) {

    setLowBandwidthMode(
      true
    );

    setVideoEnabled(
      false
    );

  } else {

    setLowBandwidthMode(
      false
    );

  }

}, [connectionType]);

  /* CONNECT */

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        setConnectionStatus(
          "Connected"
        );

      }, 3000);

    return () =>
      clearTimeout(timeout);

  }, []);

  /* CALL TIMER */

useEffect(() => {

  const interval =
    setInterval(() => {

      setCallSeconds(
        (prev) => prev + 1
      );

    }, 1000);

  return () =>
    clearInterval(interval);

}, []);

/* FORMAT TIME */

function formatCallTime(
  seconds
) {

  const mins =
    Math.floor(
      seconds / 60
    );

  const secs =
    seconds % 60;

  return `${mins
    .toString()
    .padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;

}

  /* ACTIVE SPEAKER */

  useEffect(() => {

    const interval =
      setInterval(() => {

        const random =
          participants[
            Math.floor(
              Math.random() *
                participants.length
            )
          ];

        setActiveSpeaker(
          random.name
        );

      }, 4000);

    return () =>
      clearInterval(interval);

  }, [participants]);

  if (minimized) {

  return (

    <div className="fixed bottom-24 right-4 z-[700] w-40 h-56 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

      <button
        onClick={() =>
          setMinimized(false)
        }
        className="absolute top-2 right-2 z-20 bg-black/60 w-8 h-8 rounded-full flex items-center justify-center text-white"
      >

        ⛶

      </button>

      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">

        <div className="w-20 h-20 rounded-full bg-amber-700 flex items-center justify-center text-3xl font-bold">

          {activeSpeaker?.charAt(0)}

        </div>

        <h2 className="text-white font-bold mt-4 text-sm break-words">

          {activeSpeaker}

        </h2>

        <p className="text-green-400 text-xs mt-2">

          Live Call

        </p>

      </div>

    </div>

  );

}

  return (

    <div className="fixed inset-0 z-[600] bg-black overflow-hidden flex flex-col">

      {/* MAIN SPEAKER */}
      <div className="relative flex-1 bg-zinc-950 flex items-center justify-center">

        {/* ACTIVE USER */}
        <div className="flex flex-col items-center justify-center text-center px-6">

          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-amber-700 flex items-center justify-center text-6xl md:text-8xl font-bold shadow-2xl animate-pulse">

            {activeSpeaker?.charAt(0)}

          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mt-8 break-words">

            {activeSpeaker}

          </h1>

          <p className="text-green-400 mt-4 text-lg animate-pulse">

            Speaking...

          </p>

        </div>

        {/* SCREEN SHARE */}
        {screenSharing && (

          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">

            <div className="text-center px-6">

              <div className="text-8xl">

                🖥

              </div>

              <h2 className="text-4xl font-bold text-white mt-6">

                Screen Sharing Active

              </h2>

            </div>

          </div>

        )}

        {/* TOP BAR */}
        <div className="absolute top-0 left-0 w-full z-30 p-4 flex items-center justify-between gap-4 flex-wrap">

          {/* NETWORK */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl px-4 py-3">

            <p className="text-xs md:text-sm text-zinc-300">

              🌍 {isOnline
                ? connectionType
                : "offline"}

            </p>

          </div>

          {/* STATUS */}
<div className="bg-black/60 rounded-2xl px-5 py-3 flex items-center gap-4 flex-wrap">

  <p className="text-white text-sm md:text-base">

    {connectionStatus}

  </p>

  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

  <p className="text-green-400 text-sm font-semibold">

    {formatCallTime(
      callSeconds
    )}

  </p>

  {recording && (

    <div className="flex items-center gap-2">

      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

      <p className="text-red-400 text-xs">

        Recording

      </p>

    </div>

  )}

</div>

</div>

   {/* SELF CAMERA */}
{videoEnabled && !lowBandwidthMode && (

  <div className="absolute top-24 right-5 w-[32vw] max-w-[190px] aspect-[9/16] bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl">

    <div className="w-full h-full flex flex-col items-center justify-center">

      <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-3xl font-bold">

        Y

      </div>

      <p className="text-white text-sm mt-4">

        You

      </p>

    </div>

  </div>

)}

      </div>

      {/* PARTICIPANTS */}
      <div className="absolute bottom-36 left-0 w-full px-4 overflow-x-auto">

        <div className="flex items-center gap-4 min-w-max">

          {participants.map(
            (user) => (

              <div
                key={user.id}
                className={`w-28 rounded-3xl overflow-hidden border ${
                  activeSpeaker ===
                  user.name
                    ? "border-green-500"
                    : "border-zinc-800"
                }`}
              >

                <div className="aspect-[9/16] bg-zinc-900 flex flex-col items-center justify-center">

                  <div className="w-14 h-14 rounded-full bg-amber-700 flex items-center justify-center text-xl font-bold">

                    {user.name?.charAt(0)}

                  </div>

                  <p className="text-white text-xs mt-3 px-2 text-center">

                    {user.name}

                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* LOW BANDWIDTH WARNING */}
{lowBandwidthMode && (

  <div className="absolute bottom-44 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-3 max-w-[90vw]">

    <p className="text-xs md:text-sm text-red-300 text-center">

      Video disabled automatically to preserve call stability

    </p>

  </div>

)}

      {/* LOW INTERNET */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/70 border border-zinc-800 rounded-2xl px-5 py-3 max-w-[90vw]">

        <p className="text-xs md:text-sm text-green-400 text-center">

          {connectionType ===
            "slow-2g" &&
            "Extreme low bandwidth mode active"}

          {connectionType ===
            "2g" &&
            "Ultra low data mode active"}

          {connectionType ===
            "3g" &&
            "Optimized for unstable internet"}

          {connectionType ===
            "4g" &&
            "High quality connection"}

          {connectionType ===
            "unknown" &&
            "Adaptive network mode active"}

        </p>

      </div>

      {/* MINIMIZE */}
<div className="absolute top-24 left-5 z-40">

  <button
    onClick={() =>
      setMinimized(true)
    }
    className="w-14 h-14 rounded-full bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center text-2xl"
  >

    ➖

  </button>

</div>

      {/* EXTRA CONTROLS */}
      <div className="absolute bottom-44 right-5 flex flex-col gap-3">

        {/* RECORD */}
<button
  onClick={() =>
    setRecording(
      !recording
    )
  }
  className={`w-14 h-14 rounded-full transition flex items-center justify-center text-2xl ${
    recording
      ? "bg-red-600"
      : "bg-zinc-900 hover:bg-zinc-800"
  }`}
>

  ⏺

</button>

        {/* SHARE SCREEN */}
        <button
          onClick={() =>
            setScreenSharing(
              !screenSharing
            )
          }
          className="w-14 h-14 rounded-full bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center text-2xl"
        >

          🖥

        </button>

      </div>

      {/* CONTROLS */}
      <CallControls
        muted={muted}
        setMuted={setMuted}
        videoEnabled={
          videoEnabled
        }
        setVideoEnabled={
          setVideoEnabled
        }
        endCall={endCall}
      />

    </div>

  );

}