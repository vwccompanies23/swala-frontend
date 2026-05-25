"use client";

export default function ChatHeader({
  chat,
  closeChat,
  openProfile,
  permissions,
  openMembers,
  openGroupInfo,
  startVoiceCall,
  startVideoCall,
}) {

  return (

    <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-black">

      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">

        {/* BACK */}
        <button
          onClick={closeChat}
          className="text-2xl md:hidden shrink-0"
        >
          ←
        </button>

        {/* PROFILE */}
        <button
          onClick={openProfile}
          className="flex items-center gap-3 text-left min-w-0"
        >

          {/* AVATAR */}
          <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center text-xl font-bold shrink-0">

            {chat.name?.charAt(0)}

          </div>

          {/* INFO */}
          <div className="min-w-0">

            <h2 className="font-bold text-lg md:text-xl text-white truncate">

              {chat.name}

            </h2>

            {/* STATUS */}
            <div className="flex items-center gap-2 flex-wrap mt-1">

              {/* ONLINE */}
              {chat?.status ===
                "online" && (

                <p className="text-green-500 text-sm flex items-center gap-1">

                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

                  Online

                </p>

              )}

              {/* TYPING */}
              {chat?.status ===
                "typing" && (

                <p className="text-amber-400 text-sm flex items-center gap-2">

                  <span className="flex gap-1">

                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />

                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-100" />

                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-200" />

                  </span>

                  Typing...

                </p>

              )}

              {/* RECORDING */}
              {chat?.status ===
                "recording" && (

                <p className="text-red-400 text-sm flex items-center gap-2">

                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

                  Recording audio...

                </p>

              )}

              {/* IN CALL */}
              {chat?.status ===
                "call" && (

                <p className="text-blue-400 text-sm flex items-center gap-2">

                  📞 In call

                </p>

              )}

              {/* OFFLINE */}
              {chat?.status ===
                "offline" && (

                <p className="text-zinc-500 text-sm">

                  Last seen recently

                </p>

              )}

              {/* DEFAULT */}
              {!chat?.status && (

                <p className="text-green-500 text-sm flex items-center gap-1">

                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

                  Online

                </p>

              )}

            </div>

          </div>

        </button>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">

        {/* VOICE CALL */}
        <button
          onClick={startVoiceCall}
          className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center text-lg"
        >

          📞

        </button>

        {/* VIDEO CALL */}
        <button
          onClick={startVideoCall}
          className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center text-lg"
        >

          📹

        </button>

        {/* GROUP MENU */}
        {chat.isGroup && (

          <div className="relative group">

            <button className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center text-xl text-zinc-300">

              ⋮

            </button>

            {/* MENU */}
            <div className="absolute right-0 top-14 hidden group-hover:flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden min-w-[240px] z-50 shadow-2xl">

              <button
                onClick={openGroupInfo}
                className="px-4 py-3 hover:bg-zinc-800 text-left"
              >
                ℹ️ Group Info
              </button>

              <button
                onClick={openMembers}
                className="px-4 py-3 hover:bg-zinc-800 text-left"
              >
                👥 Members
              </button>

              <button className="px-4 py-3 hover:bg-zinc-800 text-left">
                📌 Pinned Messages
              </button>

              <button className="px-4 py-3 hover:bg-zinc-800 text-left">
                🔗 Invite People
              </button>

              {permissions?.canEditGroup && (

                <button className="px-4 py-3 hover:bg-zinc-800 text-left text-amber-500">

                  ⚙️ Group Settings

                </button>

              )}

              {permissions?.canLockGroup && (

                <button className="px-4 py-3 hover:bg-zinc-800 text-left text-red-400">

                  🔒 Lock Group

                </button>

              )}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}