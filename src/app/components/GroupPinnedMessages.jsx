"use client";

import { useState } from "react";

export default function GroupPinnedMessages({
  closeModal,
}) {

  const [pinnedMessages] =
    useState([
      {
        id: 1,
        sender: "Heri",
        text:
          "Deployment starts tonight 🚀",
        time: "2:30 PM",
      },

      {
        id: 2,
        sender: "Sarah",
        text:
          "Meeting tomorrow at 10AM",
        time: "11:00 AM",
      },

      {
        id: 3,
        sender: "Mike",
        text:
          "Do not share internal builds",
        time: "Yesterday",
      },
    ]);

  return (

    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">

          <div>

            <h2 className="text-2xl font-bold text-white">

              Pinned Messages

            </h2>

            <p className="text-zinc-500 text-sm mt-1">

              Important group messages

            </p>

          </div>

          <button
            onClick={closeModal}
            className="text-2xl text-zinc-400"
          >
            ✕
          </button>

        </div>

        {/* CONTENT */}
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-4">

          {pinnedMessages.map(
            (message) => (

              <div
                key={message.id}
                className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800"
              >

                {/* TOP */}
                <div className="flex items-center justify-between mb-3">

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center font-bold text-lg">

                      {message.sender?.charAt(
                        0
                      )}

                    </div>

                    <div>

                      <h3 className="font-semibold text-white">

                        {message.sender}

                      </h3>

                      <p className="text-xs text-zinc-500">

                        {message.time}

                      </p>

                    </div>

                  </div>

                  <div className="text-amber-400 text-xl">

                    📌

                  </div>

                </div>

                {/* MESSAGE */}
                <p className="text-zinc-200 leading-relaxed">

                  {message.text}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}