"use client";

import {
  useEffect,
  useState,
} from "react";

import StatusViewer from "./StatusViewer";

export default function StatusList() {

  const [selectedStatus,
    setSelectedStatus] =
    useState(null);

  const [statuses,
    setStatuses] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [user,
    setUser] =
    useState(null);

  /* LOAD USER + REAL STATUS */

  useEffect(() => {

    async function loadStatuses() {

      try {

        const savedUser =
          localStorage.getItem(
            "swala_user"
          );

        if (
          savedUser &&
          savedUser !== "undefined"
        ) {

          const parsedUser =
            JSON.parse(savedUser);

          setUser(parsedUser);

        }

        /* LOAD REAL STATUS */

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/world-posts`
          );

        const data =
          await response.json();

        /* TURN POSTS INTO STATUS */

        const realStatuses =
          data.map((post) => ({

            id: post.id,

            name:
              post.username,

            viewed: false,

            time: new Date(
              post.created_at
            ).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),

            image:
              post.profile_picture ||
              "https://via.placeholder.com/150",

            media_url:
              post.media_url,

            media_type:
              post.media_type,

            caption:
              post.caption,

          }));

        setStatuses(
          realStatuses
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadStatuses();

  }, []);

  /* LOADING */

  if (loading) {

    return (

      <div className="p-6 text-zinc-500">

        Loading status...

      </div>

    );

  }

  return (

    <div className="p-4 space-y-4">

      {/* MY STATUS */}

      <button className="w-full flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 transition rounded-3xl p-4 text-left">

        <div className="relative">

          <img
            src={
              user?.profile_picture ||
              "https://via.placeholder.com/150"
            }
            alt="me"
            className="w-16 h-16 rounded-full object-cover"
          />

          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">

            +

          </div>

        </div>

        <div>

          <h2 className="font-bold text-white">

            My Status

          </h2>

          <p className="text-sm text-zinc-500 mt-1">

            Tap to add status

          </p>

        </div>

      </button>

      {/* EMPTY */}

      {statuses.length === 0 && (

        <div className="w-full flex items-center justify-center py-20">

          <div className="text-center">

            <h2 className="text-2xl font-bold text-white">

              No Status Yet

            </h2>

            <p className="text-zinc-500 mt-3">

              Nobody has posted a status yet.

            </p>

          </div>

        </div>

      )}

      {/* RECENT */}

      {statuses.length > 0 && (

        <div>

          <h2 className="text-zinc-500 text-sm px-2 mb-3">

            Recent Updates

          </h2>

          <div className="space-y-3">

            {statuses.map((status) => (

              <button
                key={status.id}
                onClick={() =>
                  setSelectedStatus(
                    status
                  )
                }
                className="w-full flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 transition rounded-3xl p-4 text-left"
              >

                {/* RING */}

                <div
                  className={`p-[3px] rounded-full ${
                    status.viewed
                      ? "bg-zinc-700"
                      : "bg-amber-500"
                  }`}
                >

                  <img
                    src={
                      status.image
                    }
                    alt={
                      status.name
                    }
                    className="w-16 h-16 rounded-full object-cover"
                  />

                </div>

                {/* INFO */}

                <div className="min-w-0">

                  <h2 className="font-bold text-white truncate">

                    {status.name}

                  </h2>

                  <p className="text-sm text-zinc-500 mt-1 truncate">

                    {status.caption ||
                      "New status"}

                  </p>

                  <p className="text-xs text-zinc-600 mt-1">

                    {status.time}

                  </p>

                </div>

              </button>

            ))}

          </div>

        </div>

      )}

      {/* STATUS VIEWER */}

      {selectedStatus && (

        <StatusViewer
          status={selectedStatus}
          statuses={statuses}
          closeViewer={() =>
            setSelectedStatus(null)
          }
          nextStatus={(next) =>
            setSelectedStatus(next)
          }
        />

      )}

    </div>

  );

}