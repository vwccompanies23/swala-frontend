"use client";

import { useState } from "react";

export default function GroupSettingsModal({
  closeSettings,
}) {

  /* SETTINGS */

  const [groupLocked,
    setGroupLocked] =
      useState(false);

  const [
    onlyAdminsCanText,

    setOnlyAdminsCanText,
  ] = useState(false);

  const [allowInvite,
    setAllowInvite] =
      useState(true);

  const [allowEditGroup,
    setAllowEditGroup] =
      useState(false);

  /* OWNER */

  const [owner,
    setOwner] =
      useState("Heri");

  /* ADMINS */

  const [admins, setAdmins] =
    useState([
      "Sarah",
    ]);

  /* MODERATORS */

  const [moderators,
    setModerators] =
      useState([
        "David",
      ]);

  /* MEMBERS */

  const [members, setMembers] =
    useState([
      "Mike",
      "Sophia",
      "Emma",
      "Lucas",
    ]);

  /* BANNED */

  const [bannedUsers,
    setBannedUsers] =
      useState([]);

  /* REQUESTS */

  const [joinRequests,
    setJoinRequests] =
      useState([
        "Alex",
        "Daniel",
      ]);

  /* REMOVE MEMBER */

  function removeMember(name) {

    setMembers((prev) =>
      prev.filter(
        (member) =>
          member !== name
      )
    );

  }

  /* MAKE ADMIN */

  function addAdmin(name) {

    if (
      admins.includes(name)
    )
      return;

    setAdmins((prev) => [
      ...prev,
      name,
    ]);

    removeMember(name);

  }

  /* REMOVE ADMIN */

  function removeAdmin(name) {

    setAdmins((prev) =>
      prev.filter(
        (admin) =>
          admin !== name
      )
    );

    setMembers((prev) => [
      ...prev,
      name,
    ]);

  }

  /* MAKE MODERATOR */

  function addModerator(name) {

    if (
      moderators.includes(
        name
      )
    )
      return;

    setModerators((prev) => [
      ...prev,
      name,
    ]);

    removeMember(name);

  }

  /* REMOVE MODERATOR */

  function removeModerator(
    name
  ) {

    setModerators((prev) =>
      prev.filter(
        (mod) =>
          mod !== name
      )
    );

    setMembers((prev) => [
      ...prev,
      name,
    ]);

  }

  /* BAN USER */

  function banUser(name) {

    removeMember(name);

    setBannedUsers((prev) => [
      ...prev,
      name,
    ]);

  }

  /* APPROVE REQUEST */

  function approveRequest(
    name
  ) {

    setMembers((prev) => [
      ...prev,
      name,
    ]);

    setJoinRequests((prev) =>
      prev.filter(
        (user) =>
          user !== name
      )
    );

  }

  /* DECLINE REQUEST */

  function declineRequest(
    name
  ) {

    setJoinRequests((prev) =>
      prev.filter(
        (user) =>
          user !== name
      )
    );

  }

  /* TRANSFER OWNERSHIP */

  function transferOwnership(
    name
  ) {

    setAdmins((prev) => [
      ...prev,
      owner,
    ]);

    setOwner(name);

    removeAdmin(name);

  }

  return (

    <div className="fixed inset-0 z-50 bg-black overflow-y-auto">

      {/* HEADER */}

      <div className="sticky top-0 z-20 bg-black border-b border-zinc-800 flex items-center justify-between p-4">

        <button
          onClick={
            closeSettings
          }
          className="text-2xl text-white"
        >
          ←
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-white">

          Group Settings

        </h1>

        <div />

      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">

        {/* PERMISSIONS */}

        <div className="bg-zinc-900 rounded-3xl p-5">

          <h2 className="text-xl font-bold mb-6">

            Permissions

          </h2>

          {/* LOCK */}

          <SettingToggle
            title="Lock Group"
            description="Only admins can send messages"
            enabled={groupLocked}
            toggle={() =>
              setGroupLocked(
                !groupLocked
              )
            }
          />

          {/* ADMIN TEXT */}

          <SettingToggle
            title="Admin Messages Only"
            description="Members cannot send messages"
            enabled={
              onlyAdminsCanText
            }
            toggle={() =>
              setOnlyAdminsCanText(
                !onlyAdminsCanText
              )
            }
          />

          {/* INVITES */}

          <SettingToggle
            title="Allow Member Invites"
            description="Members can invite users"
            enabled={allowInvite}
            toggle={() =>
              setAllowInvite(
                !allowInvite
              )
            }
          />

          {/* EDIT GROUP */}

          <SettingToggle
            title="Allow Group Editing"
            description="Members can edit group info"
            enabled={
              allowEditGroup
            }
            toggle={() =>
              setAllowEditGroup(
                !allowEditGroup
              )
            }
          />

        </div>

        {/* OWNER */}

        <div className="bg-zinc-900 rounded-3xl p-5">

          <h2 className="text-xl font-bold mb-5">

            Group Owner

          </h2>

          <div className="bg-zinc-800 rounded-2xl p-4 flex items-center justify-between">

            <div>

              <p className="font-semibold text-white">

                {owner}

              </p>

              <p className="text-sm text-red-400">

                Owner

              </p>

            </div>

          </div>

        </div>

        {/* ADMINS */}

        <div className="bg-zinc-900 rounded-3xl p-5">

          <h2 className="text-xl font-bold mb-5">

            Admins

          </h2>

          <div className="space-y-3">

            {admins.map(
              (admin) => (

                <div
                  key={admin}
                  className="bg-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >

                  <div>

                    <p className="font-semibold text-white">

                      {admin}

                    </p>

                    <p className="text-sm text-amber-400">

                      Admin

                    </p>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={() =>
                        transferOwnership(
                          admin
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-xl text-sm"
                    >
                      Make Owner
                    </button>

                    <button
                      onClick={() =>
                        removeAdmin(
                          admin
                        )
                      }
                      className="bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-xl text-sm"
                    >
                      Remove Admin
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* MODERATORS */}

        <div className="bg-zinc-900 rounded-3xl p-5">

          <h2 className="text-xl font-bold mb-5">

            Moderators

          </h2>

          <div className="space-y-3">

            {moderators.map(
              (mod) => (

                <div
                  key={mod}
                  className="bg-zinc-800 rounded-2xl p-4 flex items-center justify-between"
                >

                  <div>

                    <p className="font-semibold text-white">

                      {mod}

                    </p>

                    <p className="text-sm text-blue-400">

                      Moderator

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      removeModerator(
                        mod
                      )
                    }
                    className="bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-xl text-sm"
                  >
                    Remove
                  </button>

                </div>

              )
            )}

          </div>

        </div>

        {/* JOIN REQUESTS */}

        <div className="bg-zinc-900 rounded-3xl p-5">

          <h2 className="text-xl font-bold mb-5">

            Join Requests

          </h2>

          <div className="space-y-3">

            {joinRequests.map(
              (user) => (

                <div
                  key={user}
                  className="bg-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >

                  <p className="font-semibold text-white">

                    {user}

                  </p>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        approveRequest(
                          user
                        )
                      }
                      className="bg-amber-600 hover:bg-amber-500 transition px-4 py-2 rounded-xl text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        declineRequest(
                          user
                        )
                      }
                      className="bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-xl text-sm"
                    >
                      Decline
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* MEMBERS */}

        <div className="bg-zinc-900 rounded-3xl p-5">

          <h2 className="text-xl font-bold mb-5">

            Members

          </h2>

          <div className="space-y-3">

            {members.map(
              (member) => (

                <div
                  key={member}
                  className="bg-zinc-800 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                >

                  <div>

                    <p className="font-semibold text-white">

                      {member}

                    </p>

                    <p className="text-sm text-zinc-500">

                      Member

                    </p>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={() =>
                        addAdmin(
                          member
                        )
                      }
                      className="bg-amber-600 hover:bg-amber-500 transition px-4 py-2 rounded-xl text-sm"
                    >
                      Make Admin
                    </button>

                    <button
                      onClick={() =>
                        addModerator(
                          member
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-xl text-sm"
                    >
                      Moderator
                    </button>

                    <button
                      onClick={() =>
                        banUser(
                          member
                        )
                      }
                      className="bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-xl text-sm"
                    >
                      Ban
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* BANNED */}

        <div className="bg-zinc-900 rounded-3xl p-5">

          <h2 className="text-xl font-bold mb-5">

            Banned Users

          </h2>

          <div className="space-y-3">

            {bannedUsers.length ===
            0 ? (

              <p className="text-zinc-500">

                No banned users

              </p>

            ) : (

              bannedUsers.map(
                (user) => (

                  <div
                    key={user}
                    className="bg-zinc-800 rounded-2xl p-4"
                  >

                    <p className="text-red-400 font-semibold">

                      {user}

                    </p>

                  </div>

                )
              )

            )}

          </div>

        </div>

        {/* INVITE */}

        <div className="bg-zinc-900 rounded-3xl p-5">

          <h2 className="text-xl font-bold mb-5">

            Invite Link

          </h2>

          <div className="bg-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">

            <p className="text-zinc-300 break-all">

              swala.app/invite/swala-team

            </p>

            <button className="bg-amber-600 hover:bg-amber-500 transition px-5 py-2 rounded-xl">

              Copy Link

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

/* TOGGLE COMPONENT */

function SettingToggle({
  title,
  description,
  enabled,
  toggle,
}) {

  return (

    <div className="flex items-center justify-between py-4 border-b border-zinc-800 last:border-none">

      <div className="pr-4">

        <p className="font-semibold text-white">

          {title}

        </p>

        <p className="text-sm text-zinc-500 mt-1">

          {description}

        </p>

      </div>

      <button
        onClick={toggle}
        className={`px-4 py-2 rounded-full min-w-[70px] ${
          enabled
            ? "bg-amber-600"
            : "bg-zinc-700"
        }`}
      >
        {enabled
          ? "ON"
          : "OFF"}
      </button>

    </div>

  );

}