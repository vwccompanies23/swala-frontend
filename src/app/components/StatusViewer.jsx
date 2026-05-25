"use client";

import { useEffect, useState } from "react";

export default function StatusViewer({
  status,
  statuses = [],
  closeViewer,
  nextStatus,
}) {

  const [progress, setProgress] =
    useState(0);

  /* AUTO PROGRESS */
  useEffect(() => {

    setProgress(0);

    const interval =
      setInterval(() => {

        setProgress((prev) => {

          if (prev >= 100) {

            clearInterval(
              interval
            );

            setTimeout(() => {

              const currentIndex =
                statuses.findIndex(
                  (item) =>
                    item.id ===
                    status.id
                );

              const next =
                statuses[
                  currentIndex + 1
                ];

              if (next) {

                nextStatus(next);

              } else {

                closeViewer();

              }

            }, 0);

            return 100;

          }

          return prev + 1;

        });

      }, 50);

    return () =>
      clearInterval(interval);

  }, [
    status,
    statuses,
    nextStatus,
    closeViewer,
  ]);

  /* NEXT */
  function goNext() {

    const currentIndex =
      statuses.findIndex(
        (item) =>
          item.id === status.id
      );

    const next =
      statuses[currentIndex + 1];

    if (next) {

      nextStatus(next);

    } else {

      closeViewer();

    }

  }

  /* PREVIOUS */
  function goPrev() {

    const currentIndex =
      statuses.findIndex(
        (item) =>
          item.id === status.id
      );

    const prev =
      statuses[currentIndex - 1];

    if (prev) {

      nextStatus(prev);

    }

  }

  if (!status) return null;

  return (

    <div className="fixed inset-0 z-[200] bg-black flex flex-col overflow-hidden">

      {/* LEFT TAP */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-0 h-full w-1/3 z-10"
      />

      {/* RIGHT TAP */}
      <button
        onClick={goNext}
        className="absolute right-0 top-0 h-full w-1/3 z-10"
      />

      {/* TOP */}
      <div className="absolute top-0 left-0 w-full p-4 z-20">

        {/* PROGRESS */}
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-white rounded-full transition-all"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center gap-3">

            <img
              src={status.image}
              alt={status.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>

              <h2 className="font-bold text-white">

                {status.name}

              </h2>

              <p className="text-sm text-zinc-300">

                {status.time}

              </p>

            </div>

          </div>

          <button
            onClick={closeViewer}
            className="text-3xl text-white z-30"
          >
            ✕
          </button>

        </div>

      </div>

      {/* STORY */}
      <div className="flex-1 flex items-center justify-center">

        <img
          src={status.image}
          alt={status.name}
          className="w-full h-full object-cover"
        />

      </div>

      {/* BOTTOM */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-20">

        <div className="flex items-center gap-3">

          <input
            placeholder="Reply to status..."
            className="flex-1 bg-zinc-900/80 rounded-full px-5 py-4 outline-none text-white"
          />

          <button className="w-14 h-14 rounded-full bg-amber-600 hover:bg-amber-500 transition text-2xl flex items-center justify-center">

            ➤

          </button>

        </div>

      </div>

    </div>

  );

}