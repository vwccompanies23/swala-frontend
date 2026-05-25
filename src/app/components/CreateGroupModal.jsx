"use client";

import { useState } from "react";

export default function CreateGroupModal({
  closeModal,
}) {

  const [groupName, setGroupName] =
    useState("");

  const [description,
    setDescription] =
      useState("");

  const [groupImage,
    setGroupImage] =
      useState(null);

  function handleImage(e) {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setGroupImage(
        reader.result
      );

    };

    reader.readAsDataURL(file);

  }

  function createGroup() {

    if (!groupName.trim())
      return;

    alert(
      `Group "${groupName}" created 🚀`
    );

    closeModal();

  }

  return (

    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">

          <h2 className="text-2xl font-bold text-white">

            Create Group

          </h2>

          <button
            onClick={closeModal}
            className="text-2xl text-zinc-400"
          >
            ✕
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-6">

          {/* IMAGE */}
          <div className="flex flex-col items-center">

            <div className="relative">

              {groupImage ? (

                <img
                  src={groupImage}
                  alt="group"
                  className="w-32 h-32 rounded-full object-cover border-4 border-zinc-800"
                />

              ) : (

                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-yellow-700 flex items-center justify-center text-5xl">

                  👥

                </div>

              )}

              <label className="absolute bottom-1 right-1 bg-amber-600 hover:bg-amber-500 transition w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">

                📷

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />

              </label>

            </div>

          </div>

          {/* GROUP NAME */}
          <div>

            <p className="text-sm text-zinc-400 mb-2">

              Group Name

            </p>

            <input
              value={groupName}
              onChange={(e) =>
                setGroupName(
                  e.target.value
                )
              }
              placeholder="Enter group name..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none text-white"
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <p className="text-sm text-zinc-400 mb-2">

              Description

            </p>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Describe your group..."
              className="w-full min-h-[120px] bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none text-white resize-none"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={createGroup}
            className="w-full bg-amber-600 hover:bg-amber-500 transition rounded-2xl py-4 text-lg font-bold"
          >

            Create Group

          </button>

        </div>

      </div>

    </div>

  );

}