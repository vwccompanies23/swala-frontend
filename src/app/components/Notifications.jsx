"use client";

import { useState } from "react";

export default function Notifications() {

  const [notifications] =
    useState([
      {
        id: 1,
        type: "message",
        user: "Sarah",
        text: "sent you a message",
        time: "2m ago",
        unread: true,
      },

      {
        id: 2,
        type: "group",
        user: "Swala Team",
        text: "mentioned you in group",
        time: "10m ago",
        unread: true,
      },

      {
        id: 3,
        type: "status",
        user: "Mike",
        text: "replied to your status",
        time: "30m ago",
        unread: false,
      },

      {
        id: 4,
        type: "call",
        user: "David",
        text: "missed your call",
        time: "1h ago",
        unread: false,
      },
    ]);

  function getIcon(type) {

    if (type === "message")
      return "💬";

    if (type === "group")
      return "👥";

    if (type === "status")
      return "📸";

    if (type === "call")
      return "📞";

    return "🔔";

  }

  return (

    <div className="p-4 space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold text-white">

            Notifications

          </h1>

          <p className="text-zinc-500 mt-1">

            Recent activity

          </p>

        </div>

        <button className="bg-zinc-900 hover:bg-zinc-800 transition px-4 py-2 rounded-2xl text-sm">

          Mark all read

        </button>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {notifications.map(
          (notification) => (

            <button
              key={
                notification.id
              }
              className={`w-full flex items-center justify-between rounded-3xl p-4 text-left transition ${
                notification.unread
                  ? "bg-zinc-900 hover:bg-zinc-800"
                  : "bg-zinc-950 hover:bg-zinc-900"
              }`}
            >

              <div className="flex items-center gap-4">

                {/* ICON */}
                <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center text-2xl">

                  {getIcon(
                    notification.type
                  )}

                </div>

                {/* TEXT */}
                <div>

                  <h2 className="font-bold text-white">

                    {
                      notification.user
                    }

                  </h2>

                  <p className="text-zinc-400 text-sm mt-1">

                    {
                      notification.text
                    }

                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-2">

                <span className="text-xs text-zinc-500">

                  {
                    notification.time
                  }

                </span>

                {notification.unread && (

                  <div className="w-3 h-3 rounded-full bg-amber-500" />

                )}

              </div>

            </button>

          )
        )}

      </div>

    </div>

  );

}