"use client";

import { useState } from "react";

export default function ProfileModal({
  chat,
  closeProfile,
}) {

  const [bio, setBio] = useState(
    "Building Swala 🚀"
  );

  const [editingBio, setEditingBio] =
    useState(false);

  const [newBio, setNewBio] =
    useState(bio);

  const [profileImage, setProfileImage] =
    useState(null);

  function saveBio() {

    setBio(newBio);

    setEditingBio(false);

  }

  function handleProfileImage(e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setProfileImage(reader.result);

    };

    reader.readAsDataURL(file);

  }

  return (

    <div className="flex-1 bg-black flex flex-col overflow-y-auto">

      {/* HEADER */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-zinc-800 bg-black">

        <button
          onClick={closeProfile}
          className="text-2xl"
        >
          ←
        </button>

        <h2 className="text-lg font-bold text-white">
          Profile
        </h2>

        <button className="text-zinc-400 text-2xl">
          ⋮
        </button>

      </div>

      {/* COVER */}
      <div className="h-40 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-500" />

      {/* PROFILE CONTENT */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 -mt-16 pb-10">

        {/* AVATAR SECTION */}
        <div className="flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">

          {/* AVATAR */}
          <div className="relative">

            {profileImage ? (

              <img
                src={profileImage}
                alt="profile"
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-black"
              />

            ) : (

              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-amber-700 border-4 border-black flex items-center justify-center text-5xl font-bold text-white">

                {chat.name?.charAt(0)}

              </div>

            )}

            {/* UPLOAD BUTTON */}
            <label className="absolute bottom-1 right-1 bg-amber-600 hover:bg-amber-500 transition w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg">

              📷

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleProfileImage}
              />

            </label>

          </div>

          {/* NAME + STATUS */}
          <div className="mt-4 sm:mt-0 text-center sm:text-left">

            <h1 className="text-3xl font-bold text-white">

              {chat.name}

            </h1>

            <p className="text-green-500 flex items-center justify-center sm:justify-start gap-2 mt-2">

              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

              online

            </p>

          </div>

        </div>

        {/* BIO */}
        <div className="mt-6 bg-zinc-900 rounded-2xl p-4">

          <div className="flex items-center justify-between">

            <h2 className="font-semibold text-lg text-white">
              Bio
            </h2>

            {!editingBio && (

              <button
                onClick={() =>
                  setEditingBio(true)
                }
                className="text-amber-500"
              >
                ✏️
              </button>

            )}

          </div>

          {editingBio ? (

            <div className="mt-4 flex flex-col gap-3">

              <textarea
                value={newBio}
                onChange={(e) =>
                  setNewBio(
                    e.target.value
                  )
                }
                className="bg-black rounded-xl p-3 outline-none min-h-[100px] text-white resize-none"
              />

              <button
                onClick={saveBio}
                className="bg-amber-700 hover:bg-amber-600 transition rounded-xl py-3 font-semibold"
              >
                Save Bio
              </button>

            </div>

          ) : (

            <p className="text-zinc-300 mt-4 leading-relaxed">

              {bio}

            </p>

          )}

        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-3 gap-3 mt-6">

          <button className="bg-zinc-900 hover:bg-zinc-800 transition rounded-2xl py-4 flex flex-col items-center gap-2">

            <span className="text-2xl">
              📞
            </span>

            <span className="text-sm text-white">
              Call
            </span>

          </button>

          <button className="bg-zinc-900 hover:bg-zinc-800 transition rounded-2xl py-4 flex flex-col items-center gap-2">

            <span className="text-2xl">
              🎥
            </span>

            <span className="text-sm text-white">
              Video
            </span>

          </button>

          <button className="bg-zinc-900 hover:bg-zinc-800 transition rounded-2xl py-4 flex flex-col items-center gap-2">

            <span className="text-2xl">
              🔕
            </span>

            <span className="text-sm text-white">
              Mute
            </span>

          </button>

        </div>

        {/* SHARED MEDIA */}
        <div className="mt-6 bg-zinc-900 rounded-2xl p-4">

          <div className="flex items-center justify-between">

            <h2 className="font-semibold text-lg text-white">
              Shared Media
            </h2>

            <button className="text-amber-500 text-sm">
              View All
            </button>

          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">

            <div className="aspect-square rounded-xl bg-zinc-800" />

            <div className="aspect-square rounded-xl bg-zinc-800" />

            <div className="aspect-square rounded-xl bg-zinc-800" />

            <div className="aspect-square rounded-xl bg-zinc-800 hidden sm:block" />

          </div>

        </div>

        {/* INFO */}
        <div className="mt-6 bg-zinc-900 rounded-2xl p-4">

          <h2 className="font-semibold text-lg mb-4 text-white">
            Information
          </h2>

          <div className="space-y-5">

            <div>

              <p className="text-zinc-500 text-sm">
                Username
              </p>

              <p className="text-white mt-1">
                @{chat.name?.toLowerCase()}
              </p>

            </div>

            <div>

              <p className="text-zinc-500 text-sm">
                Joined
              </p>

              <p className="text-white mt-1">
                April 2026
              </p>

            </div>

            <div>

              <p className="text-zinc-500 text-sm">
                Status
              </p>

              <p className="text-green-500 mt-1">
                Active now
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}