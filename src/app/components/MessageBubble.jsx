"use client";

import { useState } from "react";
import AudioWaveform from "./AudioWaveform";

export default function MessageBubble({
  msg,
  deleteMessage,
  setReplyingTo,
  addReaction,
  editingMessage,
  setEditingMessage,
  saveEditedMessage,
  starMessage,
  forwardMessage,
  permissions,
  currentUserRole,
  userCanDeleteMessages,
}) {

  const [showReactions,
    setShowReactions] =
      useState(false);

  const [editText, setEditText] =
    useState(msg.text || "");

  const [playing, setPlaying] =
    useState(false);

  const emojis = [
    "❤️",
    "🔥",
    "😂",
    "👍",
    "😭",
  ];

  /* MENTIONS */

  function renderMentions(text) {

    if (!text) return "";

    return text
      .split(" ")
      .map((word, index) => {

        if (
          word.startsWith("@")
        ) {

          return (
            <span
              key={index}
              className="text-blue-300 font-semibold mr-1"
            >
              {word}
            </span>
          );

        }

        return (
          <span
            key={index}
            className="mr-1"
          >
            {word}
          </span>
        );

      });

  }

  return (

    <div
      onDoubleClick={() =>
        setReplyingTo(msg)
      }
      onMouseEnter={() =>
        setShowReactions(true)
      }
      onMouseLeave={() =>
        setShowReactions(false)
      }
      className={`relative max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-3xl group ${
        msg.sender === "You"
          ? "ml-auto bg-amber-700"
          : "bg-zinc-800"
      }`}
    >

      {/* ANNOUNCEMENT */}
      {msg.announcement && (

        <div className="mb-3 flex items-center gap-2">

          <span className="text-blue-300 text-xs bg-blue-500/20 px-2 py-1 rounded-full">

            📢 Announcement

          </span>

        </div>

      )}

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">

        <p className="font-semibold text-sm text-white">

          {msg.sender}

        </p>

        {/* ROLE BADGES */}
        {msg.role === "owner" && (

          <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded-full">

            OWNER

          </span>

        )}

        {msg.role === "admin" && (

          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">

            ADMIN

          </span>

        )}

        {msg.role ===
          "moderator" && (

          <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">

            MOD

          </span>

        )}

      </div>

      {/* DELETE */}
      {userCanDeleteMessages && (

        <button
          onClick={() =>
            deleteMessage(
              msg.id,
              true
            )
          }
          className="absolute -top-2 -right-2 hidden group-hover:flex bg-red-600 w-7 h-7 rounded-full items-center justify-center text-xs shadow-lg"
        >
          🗑
        </button>

      )}

      {/* EDIT */}
      {msg.sender === "You" && (

        <button
          onClick={() =>
            setEditingMessage(
              msg.id
            )
          }
          className="absolute top-8 -right-2 hidden group-hover:flex bg-blue-600 w-7 h-7 rounded-full items-center justify-center text-xs shadow-lg"
        >
          ✏️
        </button>

      )}

      {/* STAR */}
      <button
        onClick={() =>
          starMessage(msg.id)
        }
        className="absolute top-18 -right-2 hidden group-hover:flex bg-yellow-500 w-7 h-7 rounded-full items-center justify-center text-xs shadow-lg"
      >
        ⭐
      </button>

      {/* FORWARD */}
      <button
        onClick={() =>
          forwardMessage(msg)
        }
        className="absolute top-28 -right-2 hidden group-hover:flex bg-green-600 w-7 h-7 rounded-full items-center justify-center text-xs shadow-lg"
      >
        📤
      </button>

      {/* PIN */}
      {permissions?.canPinMessages && (

        <button
          className="absolute top-38 -right-2 hidden group-hover:flex bg-amber-600 w-7 h-7 rounded-full items-center justify-center text-xs shadow-lg"
        >
          📌
        </button>

      )}

      {/* REACTIONS */}
      {showReactions && (

        <div className="absolute -top-12 left-0 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2 flex gap-2 shadow-2xl z-50">

          {emojis.map(
            (emoji) => (

              <button
                key={emoji}
                onClick={() =>
                  addReaction(
                    msg.id,
                    emoji
                  )
                }
                className="hover:scale-125 transition"
              >
                {emoji}
              </button>

            )
          )}

        </div>

      )}

      {/* REPLY */}
      {msg.reply && (

        <div className="bg-black/30 rounded-2xl p-3 mb-3 border-l-2 border-amber-500">

          <p className="text-xs text-amber-400">

            Reply

          </p>

          <p className="text-sm opacity-80 mt-1">

            {msg.reply.text ||
              "Voice/Image"}

          </p>

        </div>

      )}

      {/* EDIT MODE */}
      {editingMessage ===
      msg.id ? (

        <div className="flex flex-col gap-3">

          <input
            value={editText}
            onChange={(e) =>
              setEditText(
                e.target.value
              )
            }
            className="bg-black/20 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={() =>
              saveEditedMessage(
                msg.id,
                editText
              )
            }
            className="bg-blue-600 rounded-xl py-2 text-sm"
          >
            Save
          </button>

        </div>

      ) : (

        msg.text && (

          <p className="leading-relaxed break-words">

            {renderMentions(
              msg.text
            )}

            {msg.edited && (

              <span className="text-xs opacity-60 ml-2">

                edited

              </span>

            )}

          </p>

        )

      )}

      {/* IMAGE */}
      {msg.image && (

        <img
          src={msg.image}
          alt="shared"
          className="rounded-2xl mt-3 max-h-72 w-full object-cover"
        />

      )}

      {/* AUDIO */}
      {msg.audio && (

        <div className="mt-3 bg-black/20 rounded-2xl p-3 flex items-center gap-3">

          <button
            onClick={() =>
              setPlaying(
                !playing
              )
            }
            className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center"
          >
            {playing
              ? "⏸"
              : "▶️"}
          </button>

          <AudioWaveform
            color={
              msg.sender ===
              "You"
                ? "bg-white"
                : "bg-red-400"
            }
            animated={playing}
            size="sm"
          />

        </div>

      )}

      {/* REACTIONS DISPLAY */}
      {msg.reactions
        ?.length > 0 && (

        <div className="flex gap-1 mt-3 flex-wrap">

          {msg.reactions.map(
            (
              reaction,
              index
            ) => (

              <span
                key={index}
                className="bg-black/30 px-2 py-1 rounded-full text-sm"
              >
                {reaction}
              </span>

            )
          )}

        </div>

      )}

      {/* PINNED */}
      {msg.pinned && (

        <div className="mt-3">

          <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">

            📌 Pinned

          </span>

        </div>

      )}

      {/* STARRED */}
      {msg.starred && (

        <div className="mt-3">

          <span className="text-yellow-300 text-xs bg-yellow-500/20 px-2 py-1 rounded-full">

            ⭐ Starred

          </span>

        </div>

      )}

      {/* FORWARDED */}
      {msg.forwarded && (

        <div className="mt-3">

          <span className="text-green-300 text-xs bg-green-500/20 px-2 py-1 rounded-full">

            📤 Forwarded

          </span>

        </div>

      )}

      {/* DISAPPEARING */}
      {msg.expiresAt && (

        <div className="mt-3">

          <span className="text-red-300 text-xs bg-red-500/20 px-2 py-1 rounded-full">

            ⏳ Disappears soon

          </span>

        </div>

      )}

      {/* UPLOAD STATUS */}
{msg.uploading && (

  <div className="mt-3">

    <p className="text-xs text-amber-300">

      ⏳ Uploading...

    </p>

  </div>

)}

{msg.failed && (

  <div className="mt-3 flex items-center gap-3 flex-wrap">

    <p className="text-xs text-red-400">

      Failed to send

    </p>

    <button
      className="text-xs bg-red-500 hover:bg-red-400 transition px-3 py-1 rounded-full"
    >

      Retry

    </button>

  </div>

)}

{msg.queued && (

  <div className="mt-3">

    <p className="text-xs text-yellow-400">

      Waiting for internet...

    </p>

  </div>

)}

      {/* FOOTER */}
      <div className="flex items-center justify-end gap-2 mt-3">

        <p className="text-[10px] text-gray-300">

          {msg.time}

        </p>

        {msg.sender ===
          "You" && (

          <span className="text-[10px] text-gray-300">

            {msg.status ===
              "sent" &&
              "⏳"}

            {msg.status ===
              "delivered" &&
              "✅"}

            {msg.status ===
              "seen" &&
              "👁"}

          </span>

        )}

      </div>

    </div>

  );

}