"use client";

import {
  useState,
} from "react";

export default function NewChat({
  onSelectUser,
}) {

  const [search,
    setSearch] =
    useState("");

  const [users,
    setUsers] =
    useState([]);

  async function searchUsers(
    value
  ) {

    setSearch(value);

    if (
      value.length < 2
    ) {

      setUsers([]);

      return;

    }

    const response =
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/search?search=${value}`
      );

    const data =
      await response.json();

    setUsers(data);

  }

  return (

    <div className="p-4">

      <input
        value={search}
        onChange={(e) =>
          searchUsers(
            e.target.value
          )
        }
        placeholder="Search username or phone"
        className="w-full p-4 rounded-xl bg-zinc-900 text-white"
      />

      <div className="mt-4 flex flex-col gap-3">

        {users.map(
          (user) => (

            <button
              key={user.id}
              
              onClick={async () => {

  try {

    const savedUser =
      localStorage.getItem(
        "swala_user"
      );

    if (!savedUser) {
      return;
    }

    const currentUser =
      JSON.parse(savedUser);

    const response =
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-chat`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            user1:
              currentUser.id,

            user2:
              user.id,
          }),
        }
      );

    const data =
      await response.json();

    onSelectUser({

      ...user,

      chat_id:
        data.chatId,

    });

  } catch (err) {

    console.error(err);

  }

}}


              className="bg-zinc-900 p-4 rounded-xl text-left"
            >

              <div className="font-bold text-white">

                {user.username}

              </div>

              <div className="text-zinc-400 text-sm">

                {user.phone}

              </div>

            </button>

          )
        )}

      </div>

    </div>

  );

}