"use client";

import { useEffect } from "react";

export default function NotificationToast({
  notification,
  closeToast,
}) {

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        closeToast();

      }, 4000);

    return () =>
      clearTimeout(timeout);

  }, [closeToast]);

  if (!notification)
    return null;

  return (

    <div className="fixed top-5 right-5 z-[300] animate-[slideIn_.3s_ease]">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 shadow-2xl min-w-[320px]">

        <div className="flex items-start gap-4">

          {/* ICON */}
          <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center text-2xl shrink-0">

            🔔

          </div>

          {/* TEXT */}
          <div className="flex-1">

            <h2 className="font-bold text-white">

              {
                notification.user
              }

            </h2>

            <p className="text-zinc-400 text-sm mt-1">

              {
                notification.text
              }

            </p>

          </div>

          {/* CLOSE */}
          <button
            onClick={closeToast}
            className="text-zinc-500 text-xl"
          >
            ✕
          </button>

        </div>

      </div>

    </div>

  );

}