"use client";

import { useState } from "react";

export default function GroupMessageInput({
  sendMessage,
  message,
  setMessage,
  groupLocked,
  currentUserRole,
}) {

  const [showMore, setShowMore] =
    useState(false);

  const blocked =
    groupLocked &&
    currentUserRole === "member";

  return (

    <div className="border-t border-zinc-800 bg-black p-4">

      {/* LOCKED MESSAGE */}
      {blocked && (

        <div className="mb-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 text-sm">

          🔒 Only admins can send messages
          right now.

        </div>

      )}

      {/* INPUT AREA */}
      <div className="flex items-end gap-3">

        {/* MORE */}
        <div className="relative">

          <button
            onClick={() =>
              setShowMore(!showMore)
            }
            className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center text-2xl"
          >
            +
          </button>

          {/* MENU */}
          {showMore && (

            <div className="absolute bottom-16 left-0 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden min-w-[220px] z-50">

              <button className="w-full px-4 py-4 hover:bg-zinc-800 text-left">

                📷 Photo

              </button>

              <button className="w-full px-4 py-4 hover:bg-zinc-800 text-left">

                🎥 Video

              </button>

              <button className="w-full px-4 py-4 hover:bg-zinc-800 text-left">

                📄 Document

              </button>

              <button className="w-full px-4 py-4 hover:bg-zinc-800 text-left">

                🎵 Audio

              </button>

              <button className="w-full px-4 py-4 hover:bg-zinc-800 text-left">

                📍 Location

              </button>

            </div>

          )}

        </div>

        {/* INPUT */}
        <div className="flex-1">

          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            disabled={blocked}
            placeholder={
              blocked
                ? "Group is locked"
                : "Message..."
            }
            className="w-full bg-zinc-900 rounded-full px-5 py-4 outline-none disabled:opacity-50"
          />

        </div>

        {/* SEND */}
        <button
          onClick={sendMessage}
          disabled={blocked}
          className="w-14 h-14 rounded-full bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-800 disabled:text-zinc-500 transition flex items-center justify-center text-2xl"
        >
          ➤
        </button>

      </div>

    </div>

  );

}