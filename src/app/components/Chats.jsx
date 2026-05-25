"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

export default function Chats({
  openChat,
}) {

  const [chats,
    setChats] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const searchParams =
    useSearchParams();

  /* LOAD CHATS */

  useEffect(() => {

    async function loadChats() {

      try {

        const savedUser =
          localStorage.getItem(
            "swala_user"
          );

        if (
          !savedUser ||
          savedUser === "undefined"
        ) {

          setLoading(false);

          return;

        }

        const user =
          JSON.parse(savedUser);

        const response =
          await fetch(
            `http://127.0.0.1:3001/chats/${user.id}`
          );

        const data =
          await response.json();

        setChats(data);

        /* AUTO OPEN */

        const targetUser =
          searchParams.get(
            "user"
          );

        if (targetUser) {

          const targetChat =
            data.find(
              (chat) =>
                String(
                  chat.other_user_id
                ) ===
                String(
                  targetUser
                )
            );

          if (
            targetChat
          ) {

            openChat({

              id:
                targetChat.id,

              name:
                targetChat.is_group
                  ? targetChat.group_name
                  : targetChat.other_username,

              userId:
                targetChat.other_user_id,

              profilePicture:
                targetChat.other_profile_picture,

              is_group:
                targetChat.is_group,

            });

          }

        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadChats();

  }, []);

  /* OPEN CHAT */

  function openConversation(
    chat
  ) {

    openChat({

      id:
        chat.id,

      name:
        chat.is_group
          ? chat.group_name
          : chat.other_username,

      userId:
        chat.other_user_id,

      profilePicture:
        chat.other_profile_picture,

      is_group:
        chat.is_group,

    });

  }

  /* LOADING */

  if (loading) {

    return (

      <div className="p-6 text-zinc-500">

        Loading chats...

      </div>

    );

  }

  /* EMPTY */

  if (
    chats.length === 0
  ) {

    return (

      <div className="w-full h-full flex items-center justify-center p-8">

        <div className="text-center">

          <h2 className="text-2xl font-bold text-white">

            No Messages

          </h2>

          <p className="text-zinc-500 mt-3">

            You do not have any chats yet.

          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="flex flex-col gap-3 p-4 md:p-5">

      {chats.map(
        (chat) => (

          <button
            key={chat.id}
            onClick={() =>
              openConversation(
                chat
              )
            }
            className="w-full flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 transition rounded-3xl p-4 text-left"
          >

            {/* LEFT */}

            <div className="flex items-center gap-4 min-w-0">

              {/* PROFILE */}

              {chat.other_user_profile_picture ? (

                <img
                  src={
                    chat.other_user_profile_picture
                  }
                  alt={
                    chat.other_username
                  }
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />

              ) : (

                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${
                    chat.is_group
                      ? "bg-gradient-to-br from-amber-500 to-yellow-700"
                      : "bg-amber-700"
                  }`}
                >

                  {chat.is_group
                    ? "👥"
                    : (
                        chat.other_username
                          ?.charAt(0)
                          ?.toUpperCase()
                      )}

                </div>

              )}

              {/* INFO */}

              <div className="min-w-0">

                <h2 className="font-bold text-white truncate">

                  {chat.is_group
                    ? chat.group_name
                    : chat.other_username}

                </h2>

                <p className="text-zinc-400 text-sm truncate mt-1">

                  {chat.last_message ||
                    "No messages yet"}

                </p>

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex flex-col items-end gap-2 ml-3">

              <span className="text-xs text-zinc-500">

                {chat.last_message_time
                  ? new Date(
                      chat.last_message_time
                    ).toLocaleTimeString(
                      [],
                      {
                        hour:
                          "2-digit",

                        minute:
                          "2-digit",
                      }
                    )
                  : ""}

              </span>

            </div>

          </button>

        )
      )}

    </div>

  );

}