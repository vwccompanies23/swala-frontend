"use client";

export default function CallControls({
  muted,
  setMuted,
  videoEnabled,
  setVideoEnabled,
  endCall,
}) {

  return (

    <div className="absolute bottom-0 left-0 w-full p-6 flex items-center justify-center gap-4 bg-gradient-to-t from-black/80 to-transparent">

      {/* MIC */}
      <button
        onClick={() =>
          setMuted(!muted)
        }
        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition ${
          muted
            ? "bg-red-600"
            : "bg-zinc-800"
        }`}
      >

        {muted ? "🔇" : "🎤"}

      </button>

      {/* VIDEO */}
      <button
        onClick={() =>
          setVideoEnabled(
            !videoEnabled
          )
        }
        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition ${
          !videoEnabled
            ? "bg-red-600"
            : "bg-zinc-800"
        }`}
      >

        {videoEnabled
          ? "📹"
          : "🚫"}

      </button>

      {/* END */}
      <button
        onClick={endCall}
        className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 transition flex items-center justify-center text-3xl"
      >

        📞

      </button>

    </div>

  );

}