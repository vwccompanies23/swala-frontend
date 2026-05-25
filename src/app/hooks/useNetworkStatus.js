"use client";

import { useEffect, useState } from "react";

export default function useNetworkStatus() {

  const [isOnline,
    setIsOnline] =
      useState(true);

  const [connectionType,
    setConnectionType] =
      useState("unknown");

  useEffect(() => {

    function updateStatus() {

      setIsOnline(
        navigator.onLine
      );

      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      if (
        connection?.effectiveType
      ) {

        setConnectionType(
          connection.effectiveType
        );

      }

    }

    updateStatus();

    window.addEventListener(
      "online",
      updateStatus
    );

    window.addEventListener(
      "offline",
      updateStatus
    );

    return () => {

      window.removeEventListener(
        "online",
        updateStatus
      );

      window.removeEventListener(
        "offline",
        updateStatus
      );

    };

  }, []);

  return {
    isOnline,
    connectionType,
  };

}