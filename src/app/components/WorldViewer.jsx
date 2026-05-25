"use client";

import { useState } from "react";

export default function WorldViewer({
  currentPost,
  closeViewer,
}) {

  const [liked,
    setLiked] =
      useState(false);

  const [likes,
    setLikes] =
      useState(
        currentPost?.likes || 0
      );

  const [comment,
    setComment] =
      useState("");

  const [comments,
    setComments] =
      useState([
        {
          id: 1,
          user: "Sarah",
          text:
            "Amazing post 🔥",
        },

        {
          id: 2,
          user: "Mike",
          text:
            "Looks great 👏",
        },
      ]);

  /* LIKE */

  function toggleLike() {

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

  /* COMMENT */

  function addComment() {

    if (!comment.trim())
      return;

    const newComment = {

      id: Date.now(),

      user: "You",

      text: comment,

    };

    setComments((prev) => [
      newComment,
      ...prev,
    ]);

    setComment("");

  }

  if (!currentPost)
    return null;

  return (

    <div className="flex flex-col w-full h-full bg-zinc-950 overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 p-4 md:p-5 border-b border-zinc-800 shrink-0">

        <div className="flex items-center gap-3 min-w-0">

          {/* AVATAR */}
          <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center text-lg font-bold shrink-0">

            {currentPost.user?.charAt(
              0
            )}

          </div>

          {/* USER */}
          <div className="min-w-0">

            <h2 className="font-bold text-white truncate">

              {
                currentPost.user
              }

            </h2>

            <p className="text-xs text-zinc-500 mt-1">

              {
                currentPost.durationLabel
              }

            </p>

          </div>

        </div>

        {/* CLOSE */}
        <button
          onClick={closeViewer}
          className="text-3xl text-white"
        >

          ✕

        </button>

      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto">

        {/* IMAGE / VIDEO */}
        <div className="bg-black flex items-center justify-center">

          {currentPost.type ===
          "image" ? (

            <img
              src={
                currentPost.media
              }
              alt={
                currentPost.caption
              }
              className="w-full max-h-[70vh] object-contain"
            />

          ) : (

            <video
              src={
                currentPost.media
              }
              controls
              autoPlay
              className="w-full max-h-[70vh]"
            />

          )}

        </div>

        {/* CONTENT */}
        <div className="max-w-3xl mx-auto w-full">

          {/* CAPTION */}
          {currentPost.caption && (

            <div className="p-5 border-b border-zinc-800">

              <p className="text-zinc-200 leading-relaxed break-words text-sm md:text-base">

                {
                  currentPost.caption
                }

              </p>

            </div>

          )}

          {/* ACTIONS */}
          <div className="flex items-center justify-between gap-3 p-5 border-b border-zinc-800 flex-wrap">

            <div className="flex items-center gap-5">

              {/* LIKE */}
              <button
                onClick={
                  toggleLike
                }
                className={`flex items-center gap-2 ${
                  liked
                    ? "text-red-500"
                    : "text-zinc-300"
                }`}
              >

                ❤️

                <span>

                  {likes}

                </span>

              </button>

              {/* COMMENTS */}
              <div className="flex items-center gap-2 text-zinc-300">

                💬

                <span>

                  {
                    comments.length
                  }

                </span>

              </div>

              {/* SHARE */}
              <button className="flex items-center gap-2 text-zinc-300">

                📤

                <span>

                  Share

                </span>

              </button>

            </div>

            {/* VIEWS */}
            <p className="text-sm text-zinc-500">

              👁 {
                currentPost.views
              } views

            </p>

          </div>

          {/* COMMENTS */}
          <div className="p-5 space-y-5">

            {comments.map(
              (item) => (

                <div
                  key={item.id}
                  className="flex gap-3"
                >

                  {/* AVATAR */}
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">

                    {
                      item.user?.charAt(
                        0
                      )
                    }

                  </div>

                  {/* COMMENT */}
                  <div className="bg-zinc-900 rounded-2xl px-4 py-3 max-w-full">

                    <h3 className="font-semibold text-white text-sm">

                      {item.user}

                    </h3>

                    <p className="text-zinc-300 text-sm mt-1 break-words">

                      {item.text}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {/* COMMENT INPUT */}
      <div className="p-4 border-t border-zinc-800 flex items-center gap-3 shrink-0">

        <input
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          placeholder="Write a comment..."
          className="flex-1 bg-zinc-900 rounded-full px-5 py-3 outline-none"
        />

        <button
          onClick={
            addComment
          }
          className="bg-amber-600 hover:bg-amber-500 transition px-5 py-3 rounded-full"
        >

          Send

        </button>

      </div>

    </div>

  );

}