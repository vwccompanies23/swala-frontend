"use client";

import { useState } from "react";

export default function GroupAboutModal({
  group,
  closeModal,
}) {

  const [groupName, setGroupName] =
    useState(group.name);

  const [description, setDescription] =
    useState(group.description);

  const [locked, setLocked] =
    useState(group.locked || false);

  const [announcementMode,
    setAnnouncementMode] =
      useState(false);

  const [whoCanMessage,
    setWhoCanMessage] =
      useState("everyone");

  const [whoCanInvite,
    setWhoCanInvite] =
      useState("admins");

  const currentUserRole =
    "owner";

  const canManageGroup =
    currentUserRole === "owner" ||
    currentUserRole === "admin";

  return (

    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Group Settings
            </h2>

            <p className="text-zinc-500 text-sm mt-1">
              Manage your community
            </p>

          </div>

          <button
            onClick={closeModal}
            className="text-2xl text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-8">

          {/* GROUP NAME */}
          <div>

            <p className="text-zinc-500 text-sm mb-3">
              Group Name
            </p>

            {canManageGroup ? (

              <input
                value={groupName}
                onChange={(e) =>
                  setGroupName(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none focus:border-amber-500 text-white"
              />

            ) : (

              <h3 className="text-2xl font-bold text-white">

                {groupName}

              </h3>

            )}

          </div>

          {/* DESCRIPTION */}
          <div>

            <p className="text-zinc-500 text-sm mb-3">
              Description
            </p>

            {canManageGroup ? (

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none focus:border-amber-500 text-white resize-none min-h-[120px]"
              />

            ) : (

              <p className="text-white leading-relaxed">

                {description}

              </p>

            )}

          </div>

          {/* GROUP STATUS */}
          <div className="bg-zinc-900 rounded-3xl p-5 space-y-5">

            <h3 className="text-lg font-semibold text-white">

              Group Controls

            </h3>

            {/* LOCK */}
            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-white font-medium">
                  Lock Group
                </p>

                <p className="text-zinc-500 text-sm mt-1">
                  Only admins can send messages
                </p>

              </div>

              <button
                disabled={!canManageGroup}
                onClick={() =>
                  setLocked(!locked)
                }
                className={`w-16 h-9 rounded-full transition flex items-center px-1 ${
                  locked
                    ? "bg-red-500"
                    : "bg-zinc-700"
                }`}
              >

                <div
                  className={`w-7 h-7 rounded-full bg-white transition ${
                    locked
                      ? "translate-x-7"
                      : ""
                  }`}
                />

              </button>

            </div>

            {/* ANNOUNCEMENT */}
            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-white font-medium">
                  Announcement Mode
                </p>

                <p className="text-zinc-500 text-sm mt-1">
                  Admins only can post announcements
                </p>

              </div>

              <button
                disabled={!canManageGroup}
                onClick={() =>
                  setAnnouncementMode(
                    !announcementMode
                  )
                }
                className={`w-16 h-9 rounded-full transition flex items-center px-1 ${
                  announcementMode
                    ? "bg-blue-500"
                    : "bg-zinc-700"
                }`}
              >

                <div
                  className={`w-7 h-7 rounded-full bg-white transition ${
                    announcementMode
                      ? "translate-x-7"
                      : ""
                  }`}
                />

              </button>

            </div>

          </div>

          {/* PERMISSIONS */}
          <div className="bg-zinc-900 rounded-3xl p-5 space-y-5">

            <h3 className="text-lg font-semibold text-white">

              Permissions

            </h3>

            {/* MESSAGE */}
            <div>

              <p className="text-white mb-3">
                Who can send messages
              </p>

              <select
                value={whoCanMessage}
                onChange={(e) =>
                  setWhoCanMessage(
                    e.target.value
                  )
                }
                disabled={!canManageGroup}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 outline-none text-white"
              >

                <option value="everyone">
                  Everyone
                </option>

                <option value="admins">
                  Admins Only
                </option>

              </select>

            </div>

            {/* INVITE */}
            <div>

              <p className="text-white mb-3">
                Who can invite people
              </p>

              <select
                value={whoCanInvite}
                onChange={(e) =>
                  setWhoCanInvite(
                    e.target.value
                  )
                }
                disabled={!canManageGroup}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 outline-none text-white"
              >

                <option value="everyone">
                  Everyone
                </option>

                <option value="admins">
                  Admins Only
                </option>

              </select>

            </div>

          </div>

          {/* SAVE */}
          {canManageGroup && (

            <button className="w-full bg-amber-600 hover:bg-amber-500 transition rounded-2xl py-4 text-lg font-semibold">

              Save Changes

            </button>

          )}

        </div>

      </div>

    </div>

  );

}