"use client";

import { useState } from "react";

export default function GroupInviteModal({
  closeModal,
}) {

  const [inviteLink] =
    useState(
      "https://swala.app/invite/TEAM123"
    );

  const [copied, setCopied] =
    useState(false);

  function copyInvite() {

    navigator.clipboard.writeText(
      inviteLink
    );

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  }

  return (

    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">

          <div>

            <h2 className="text-2xl font-bold text-white">

              Invite People

            </h2>

            <p className="text-zinc-500 text-sm mt-1">

              Share your group invite link

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
        <div className="p-6 space-y-6">

          {/* LINK BOX */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 break-all text-zinc-300">

            {inviteLink}

          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <button
              onClick={copyInvite}
              className="bg-amber-600 hover:bg-amber-500 transition rounded-2xl py-4 font-semibold text-white"
            >

              {copied
                ? "✅ Copied"
                : "📋 Copy Invite Link"}

            </button>

            <button
              className="bg-zinc-800 hover:bg-zinc-700 transition rounded-2xl py-4 font-semibold text-white"
            >

              📤 Share Invite

            </button>

          </div>

          {/* INFO */}
          <div className="bg-zinc-900 rounded-2xl p-4">

            <p className="text-sm text-zinc-400 leading-relaxed">

              Anyone with this invite link
              can request to join the group.
              Admins can disable invite links
              anytime from group settings.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}