"use client";

import { useState } from "react";

export default function GroupMembersModal({
  group,
  closeModal,
}) {

  const [members, setMembers] =
    useState(group.members);

  const currentUserRole =
    "owner";

  /* CHANGE ROLE */

  function updateRole(
    memberId,
    newRole
  ) {

    setMembers((prev) =>
      prev.map((member) => {

        if (
          member.id === memberId
        ) {

          return {
            ...member,
            role: newRole,
          };

        }

        return member;

      })
    );

  }

  /* REMOVE MEMBER */

  function removeMember(
    memberId
  ) {

    setMembers((prev) =>
      prev.filter(
        (member) =>
          member.id !==
          memberId
      )
    );

  }

  return (

    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Group Members
            </h2>

            <p className="text-zinc-500 text-sm mt-1">

              {members.length} participants

            </p>

          </div>

          <button
            onClick={closeModal}
            className="text-2xl text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>

        </div>

        {/* MEMBERS */}
        <div className="max-h-[75vh] overflow-y-auto p-4 space-y-3">

          {members.map((member) => (

            <div
              key={member.id}
              className="bg-zinc-900 rounded-3xl p-4"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* LEFT */}
                <div className="flex items-center gap-4 min-w-0">

                  {/* AVATAR */}
                  <div className="w-14 h-14 rounded-full bg-amber-700 flex items-center justify-center text-xl font-bold shrink-0">

                    {member.name?.charAt(0)}

                  </div>

                  {/* INFO */}
                  <div className="min-w-0">

                    <div className="flex items-center gap-2 flex-wrap">

                      <h3 className="font-semibold text-white truncate">

                        {member.name}

                      </h3>

                      {/* BADGES */}
                      {member.role ===
                        "owner" && (

                        <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded-full">

                          OWNER

                        </span>

                      )}

                      {member.role ===
                        "admin" && (

                        <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">

                          ADMIN

                        </span>

                      )}

                      {member.role ===
                        "moderator" && (

                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">

                          MOD

                        </span>

                      )}

                    </div>

                    <p className="text-sm text-zinc-500 capitalize mt-1">

                      {member.role}

                    </p>

                  </div>

                </div>

                {/* ACTIONS */}
                {currentUserRole ===
                  "owner" &&
                  member.role !==
                    "owner" && (

                  <div className="flex flex-wrap gap-2">

                    {/* MAKE ADMIN */}
                    {member.role !==
                      "admin" && (

                      <button
                        onClick={() =>
                          updateRole(
                            member.id,
                            "admin"
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition text-sm"
                      >
                        Make Admin
                      </button>

                    )}

                    {/* MAKE MOD */}
                    {member.role !==
                      "moderator" && (

                      <button
                        onClick={() =>
                          updateRole(
                            member.id,
                            "moderator"
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition text-sm"
                      >
                        Make Mod
                      </button>

                    )}

                    {/* REMOVE ADMIN */}
                    {(member.role ===
                      "admin" ||
                      member.role ===
                        "moderator") && (

                      <button
                        onClick={() =>
                          updateRole(
                            member.id,
                            "member"
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition text-sm"
                      >
                        Remove Role
                      </button>

                    )}

                    {/* REMOVE USER */}
                    <button
                      onClick={() =>
                        removeMember(
                          member.id
                        )
                      }
                      className="px-3 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm"
                    >
                      Remove
                    </button>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}