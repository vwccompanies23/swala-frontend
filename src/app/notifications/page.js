"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadNotifications();

  }, []);

  async function loadNotifications() {

    try {

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications/1`
        );

      const data =
        await response.json();

      setNotifications(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >

      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Notifications
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "30px",
        }}
      >
        Recent activity
      </p>

      {loading ? (

        <p>Loading...</p>

      ) : notifications.length === 0 ? (

        <p>No notifications found</p>

      ) : (

        notifications.map((item) => (

          <div
            key={item.id}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "20px",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                }}
              >
                {item.username}
              </h2>

              <p
                style={{
                  marginTop: "5px",
                  color: "#cbd5e1",
                }}
              >
                {item.text}
              </p>

            </div>

            {!item.is_read && (

              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "gold",
                }}
              />

            )}

          </div>

        ))

      )}

    </div>

  );

}