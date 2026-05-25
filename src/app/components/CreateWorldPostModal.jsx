"use client";

import { useState } from "react";

export default function CreateWorldPostModal({
  closeModal,
  createPost,
}) {

  const [file,
    setFile] =
      useState(null);

  const [preview,
    setPreview] =
      useState(null);

  const [mediaType,
    setMediaType] =
      useState("");

  const [caption,
    setCaption] =
      useState("");

  const [duration,
    setDuration] =
      useState("24h");

  const [uploading,
    setUploading] =
      useState(false);

  /* HANDLE FILE */

  function handleFile(e) {

    const selectedFile =
      e.target.files[0];

    if (!selectedFile) {

      return;

    }

    setFile(selectedFile);

    /* DETECT TYPE */

    if (
      selectedFile.type.startsWith(
        "video/"
      )
    ) {

      setMediaType(
        "video"
      );

    } else {

      setMediaType(
        "image"
      );

    }

    /* PREVIEW */

    const fileUrl =
      URL.createObjectURL(
        selectedFile
      );

    setPreview(fileUrl);

  }

  /* CREATE POST */

  async function handleCreate() {

    if (!file) {

      return;

    }

    try {

      setUploading(true);

      /* EXPIRES */

      let expiresAt =
        new Date();

      if (
        duration === "24h"
      ) {

        expiresAt.setHours(
          expiresAt.getHours() +
            24
        );

      }

      if (
        duration === "48h"
      ) {

        expiresAt.setHours(
          expiresAt.getHours() +
            48
        );

      }

      if (
        duration === "1w"
      ) {

        expiresAt.setDate(
          expiresAt.getDate() +
            7
        );

      }

      if (
        duration === "1m"
      ) {

        expiresAt.setMonth(
          expiresAt.getMonth() +
            1
        );

      }

      /* FORM DATA */

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "caption",
        caption
      );

      formData.append(
        "media_type",
        mediaType
      );

      formData.append(
        "expires_at",
        expiresAt.toISOString()
      );

      /* REAL USER */

      formData.append(
        "user_id",
        "1"
      );

      /* API */

      const response =
        await fetch(
          "http://127.0.0.1:3001/world-posts",
          {
            method: "POST",
            body: formData,
          }
        );

      if (!response.ok) {

        throw new Error(
          "Failed to create post"
        );

      }

      const savedPost =
        await response.json();

      /* ADD TO FEED */

      createPost(
        savedPost
      );

      closeModal();

    } catch (err) {

      console.error(
        "CREATE POST ERROR:",
        err
      );

    } finally {

      setUploading(false);

    }

  }

  return (

    <div className="fixed inset-0 z-[900] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4">

      {/* MODAL */}

      <div className="w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-2xl bg-zinc-950 border border-zinc-800 sm:rounded-[2rem] overflow-hidden flex flex-col">

        {/* HEADER */}

        <div className="flex items-center justify-between p-4 md:p-5 border-b border-zinc-800 shrink-0">

          <h1 className="text-xl md:text-2xl font-bold text-white">

            Create World Post

          </h1>

          <button
            onClick={
              closeModal
            }
            className="text-2xl text-zinc-400 hover:text-white transition"
          >

            ✕

          </button>

        </div>

        {/* BODY */}

        <div className="flex-1 overflow-y-auto">

          <div className="p-4 md:p-5 space-y-5">

            {/* UPLOAD */}

            <label className="w-full min-h-[260px] sm:min-h-[320px] md:min-h-[420px] rounded-3xl border-2 border-dashed border-zinc-700 hover:border-amber-500 transition flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-zinc-900">

              {!preview ? (

                <div className="text-center p-6">

                  <div className="text-5xl md:text-6xl">

                    🌍

                  </div>

                  <p className="mt-4 text-zinc-400 text-sm md:text-base">

                    Choose image or video

                  </p>

                </div>

              ) : mediaType ===
                "image" ? (

                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

              ) : (

                <video
                  src={preview}
                  controls
                  className="w-full h-full object-cover"
                />

              )}

              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={
                  handleFile
                }
              />

            </label>

            {/* TYPE */}

            {mediaType && (

              <div className="bg-zinc-900 rounded-2xl px-4 py-3 text-sm text-zinc-300">

                Selected Type:

                <span className="ml-2 text-amber-400 font-bold uppercase">

                  {mediaType}

                </span>

              </div>

            )}

            {/* CAPTION */}

            <textarea
              value={caption}
              onChange={(e) =>
                setCaption(
                  e.target.value
                )
              }
              placeholder="Write something..."
              className="w-full bg-zinc-900 rounded-3xl p-4 md:p-5 outline-none resize-none h-28 md:h-32 text-sm md:text-base"
            />

            {/* DURATION */}

            <div>

              <p className="text-sm text-zinc-400 mb-3">

                Post duration

              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                {[
                  {
                    value: "24h",
                    label:
                      "24 Hours",
                  },

                  {
                    value: "48h",
                    label:
                      "48 Hours",
                  },

                  {
                    value: "1w",
                    label:
                      "1 Week",
                  },

                  {
                    value: "1m",
                    label:
                      "1 Month",
                  },

                ].map((item) => (

                  <button
                    key={
                      item.value
                    }
                    onClick={() =>
                      setDuration(
                        item.value
                      )
                    }
                    className={`rounded-2xl py-3 md:py-4 px-3 text-sm font-semibold transition ${
                      duration ===
                      item.value
                        ? "bg-amber-600 text-white"
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                    }`}
                  >

                    {item.label}

                  </button>

                ))}

              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="p-4 md:p-5 border-t border-zinc-800 shrink-0">

          <button
            onClick={
              handleCreate
            }
            disabled={
              !file ||
              uploading
            }
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 transition rounded-2xl py-4 text-base md:text-lg font-bold"
          >

            {uploading
              ? "Uploading..."
              : "Post to World"}

          </button>

        </div>

      </div>

    </div>

  );

}