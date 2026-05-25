import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL,
  {
    transports: ["websocket"],

    reconnection: true,

    reconnectionAttempts: Infinity,

    reconnectionDelay: 1000,

    reconnectionDelayMax: 5000,

    timeout: 20000,

    autoConnect: true,
  }
);

/* =========================
   CONNECTION
========================= */

socket.on(
  "connect",
  () => {

    console.log(
      "Socket connected:",
      socket.id
    );

  }
);

/* =========================
   DISCONNECT
========================= */

socket.on(
  "disconnect",
  (reason) => {

    console.log(
      "Socket disconnected:",
      reason
    );

  }
);

/* =========================
   RECONNECT
========================= */

socket.on(
  "reconnect",
  (attempt) => {

    console.log(
      "Socket reconnected:",
      attempt
    );

  }
);

/* =========================
   CONNECT ERROR
========================= */

socket.on(
  "connect_error",
  (err) => {

    console.error(
      "Socket connection error:",
      err.message
    );

  }
);

export default socket;