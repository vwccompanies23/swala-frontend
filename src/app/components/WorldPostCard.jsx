"use client";

import { useState } from "react";

export default function WorldPostCard({
  post,
  openPost,
}) {

  const [liked, setLiked] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [likes, setLikes] =
    useState(
      post.likes || 0
    );

  /* TIME LEFT */

  function getTimeLeft() {

    const now =
      new Date().getTime();

    const distance =
      new Date(
        post.expires_at
      ).getTime() - now;

    if (distance <= 0) {

      return "Expired";

    }

    const days =
      Math.floor(
        distance /
          (1000 * 60 * 60 * 24)
      );

    const hours =
      Math.floor(
        (
          distance %
          (1000 * 60 * 60 * 24)
        ) /
          (1000 * 60 * 60)
      );

    const minutes =
      Math.floor(
        (
          distance %
          (1000 * 60 * 60)
        ) /
          (1000 * 60)
      );

    if (days > 0) {

      return `${days}d left`;

    }

    if (hours > 0) {

      return `${hours}h left`;

    }

    return `${minutes}m left`;

  }

  /* LIKE */

  function toggleLike(e) {

    e.stopPropagation();

    if (liked) {

      setLikes(
        (prev) => prev - 1
      );

    } else {

      setLikes(
        (prev) => prev + 1
      );

    }

    setLiked(!liked);

  }

  return (

    <div className="w-full bg-black border-b border-zinc-800">

      {/* TOP */}

      <div className="flex items-center justify-between px-4 py-4">

        <div className="flex items-center gap-3 min-w-0">

          {/* PROFILE */}

          <button
            onClick={() =>
              openPost(post)
            }
            className="shrink-0"
          >

            {post.profile_picture ? (

              <img
                src={
                  post.profile_picture
                }
                alt={
                  post.username
                }
                className="w-12 h-12 rounded-full object-cover"
              />

            ) : (

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-white font-bold text-lg">

                {post.username
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

            )}

          </button>

          {/* INFO */}

          <div className="min-w-0">

            <div className="flex items-center gap-2 flex-wrap">

              <h2 className="font-bold text-white text-sm sm:text-base truncate">

                {post.username}

              </h2>

              <span className="text-blue-400 text-xs">

                ✔

              </span>

              <span className="text-zinc-500 text-xs">

                • {getTimeLeft()}

              </span>

            </div>

            <p className="text-xs text-zinc-500 mt-1">

              🌍 World Post

            </p>

          </div>

        </div>

        {/* MORE */}

        <button className="text-zinc-500 hover:text-white text-xl transition">

          ⋯

        </button>

      </div>

      {/* CAPTION */}

      {post.caption && (

        <div className="px-4 pb-4">

          <p className="text-zinc-200 text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap break-words">

            {post.caption}

          </p>

        </div>

      )}

      {/* MEDIA */}

      {post.media_url && (

        <button
          onClick={() =>
            openPost(post)
          }
          className="w-full bg-black"
        >

          {/* IMAGE */}

          {post.media_type ===
            "image" && (

            <img
              src={
                post.media_url
              }
              alt={
                post.caption
              }
              className="w-full max-h-[75vh] object-cover"
            />

          )}

          {/* VIDEO */}

          {post.media_type ===
            "video" && (

            <video
              src={
                post.media_url
              }
              controls
              className="w-full max-h-[75vh] object-cover bg-black"
            />

          )}

        </button>

      )}

      {/* STATS */}

      <div className="px-4 pt-4 flex items-center justify-between text-sm text-zinc-400">

        <div className="flex items-center gap-4 flex-wrap">

          <span>

            ❤️ {likes}

          </span>

          <span>

            💬 {post.comments || 0}

          </span>

          <span>

            👁 {post.views || 0}

          </span>

        </div>

      </div>

      {/* ACTIONS */}

      <div className="px-4 py-4 flex items-center justify-between border-b border-zinc-800">

        <div className="flex items-center gap-6">

          {/* LIKE */}

          <button
            onClick={toggleLike}
            className={`flex items-center gap-2 transition active:scale-95 ${
              liked
                ? "text-red-500"
                : "text-zinc-300"
            }`}
          >

            <span className="text-2xl">

              {liked
                ? "❤️"
                : "🤍"}

            </span>

            <span className="text-sm font-medium">

              Like

            </span>

          </button>

          {/* COMMENT */}

          <button
            onClick={() =>
              openPost(post)
            }
            className="flex items-center gap-2 text-zinc-300 hover:text-white transition active:scale-95"
          >

            <span className="text-2xl">

              💬

            </span>

            <span className="text-sm font-medium">

              Comment

            </span>

          </button>

          {/* SHARE */}

          <button className="flex items-center gap-2 text-zinc-300 hover:text-white transition active:scale-95">

            <span className="text-2xl">

              📤

            </span>

            <span className="text-sm font-medium">

              Share

            </span>

          </button>

        </div>

        {/* SAVE */}

        <button
          onClick={() =>
            setSaved(!saved)
          }
          className="text-2xl text-zinc-300 hover:text-white transition active:scale-95"
        >

          {saved
            ? "🔖"
            : "📑"}

        </button>

      </div>

    </div>

  );

}