"use client";

export default function GroupPinnedBanner({
  pinnedMessage,
  openPinnedMessages,
}) {

  if (!pinnedMessage)
    return null;

  return (

    <button
      onClick={openPinnedMessages}
      className="w-full flex items-center justify-between gap-4 bg-amber-600/10 border-b border-amber-500/20 px-4 py-3 hover:bg-amber-600/20 transition text-left"
    >

      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">

        <div className="text-xl">

          📌

        </div>

        <div className="min-w-0">

          <p className="text-xs text-amber-400">

            Pinned Message

          </p>

          <p className="text-sm text-white truncate">

            {pinnedMessage}

          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="text-zinc-400 text-sm">

        View

      </div>

    </button>

  );

}