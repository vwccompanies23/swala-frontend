"use client";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import socket
from "../services/socket";

import VoiceRecorder
from "./VoiceRecorder";

export default function ChatInput({
  selectedChat,
  startCall,
}) {

  const [message,
    setMessage] =
      useState("");

  const [user,
    setUser] =
      useState(null);

  const [recording,
    setRecording] =
      useState(false);

  const mediaRecorder =
    useRef(null);

  const audioChunks =
    useRef([]);

  /* =========================
     LOAD USER
  ========================= */

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "swala_user"
      );

    if (
      savedUser &&
      savedUser !== "undefined"
    ) {

      setUser(
        JSON.parse(savedUser)
      );

    }

  }, []);

  /* =========================
     SEND MESSAGE
  ========================= */

  function sendMessage() {

    if (
      !message.trim() ||
      !user
    ) return;

    socket.emit(
      "send_message",
      {
        chatId:
          selectedChat.id,

        senderId:
          user.id,

        receiverId:
          selectedChat.userId,

        username:
          user.username,

        message:
          message.trim(),
      }
    );

    socket.emit(
      "stop_typing",
      {
        chatId:
          selectedChat.id,
      }
    );

    setMessage("");

  }

  /* =========================
     TYPING
  ========================= */

  function handleTyping(
    value
  ) {

    setMessage(value);

    if (!user) return;

    socket.emit(
      "typing",
      {
        chatId:
          selectedChat.id,

        name:
          user.username,
      }
    );

  }

  /* =========================
     ENTER SEND
  ========================= */

  function handleKeyDown(
    e
  ) {

    if (
      e.key === "Enter"
    ) {

      sendMessage();

    }

  }

  /* =========================
     AUDIO CALL
  ========================= */

  function startAudioCall() {

    if (!user) return;

    startCall({
      type: "audio",
      userId:
        selectedChat.userId,

      name:
        selectedChat.name,
    });

  }

  /* =========================
     VIDEO CALL
  ========================= */

  function startVideoCall() {

    if (!user) return;

    startCall({
      type: "video",
      userId:
        selectedChat.userId,

      name:
        selectedChat.name,
    });

  }

  /* =========================
     START RECORDING
  ========================= */

  async function startRecording() {

    try {

      const stream =
        await navigator
          .mediaDevices
          .getUserMedia({
            audio: true,
          });

      const recorder =
        new MediaRecorder(
          stream,
          {
            mimeType:
              "audio/webm",
          }
        );

      mediaRecorder.current =
        recorder;

      audioChunks.current = [];

      recorder.ondataavailable =
        (event) => {

          if (
            event.data.size > 0
          ) {

            audioChunks.current.push(
              event.data
            );

          }

        };

      recorder.onstop =
        async () => {

          const audioBlob =
            new Blob(
              audioChunks.current,
              {
                type:
                  "audio/webm",
              }
            );

          /* LOW INTERNET SAFE */

          if (
            audioBlob.size >
            10000000
          ) {

            alert(
              "Voice note too large"
            );

            return;

          }

          const audioUrl =
            URL.createObjectURL(
              audioBlob
            );

          socket.emit(
            "send_voice_message",
            {
              chatId:
                selectedChat.id,

              senderId:
                user.id,

              receiverId:
                selectedChat.userId,

              username:
                user.username,

              audio:
                audioUrl,

              type:
                "voice",
            }
          );

        };

      recorder.start();

      setRecording(true);

    } catch (err) {

      console.error(err);

    }

  }

  /* =========================
     STOP RECORDING
  ========================= */

  function stopRecording(
    cancelled
  ) {

    if (
      !mediaRecorder.current
    ) return;

    if (cancelled) {

      audioChunks.current = [];

    }

    mediaRecorder.current.stop();

    setRecording(false);

  }

  return (

    <div className="flex items-center gap-3">

      {/* AUDIO CALL */}

      <button
        onClick={
          startAudioCall
        }
        className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center text-xl shrink-0"
      >

        📞

      </button>

      {/* VIDEO CALL */}

      <button
        onClick={
          startVideoCall
        }
        className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center text-xl shrink-0"
      >

        🎥

      </button>

      {/* INPUT */}

      <input
        type="text"
        value={message}
        onChange={(e) =>
          handleTyping(
            e.target.value
          )
        }
        onKeyDown={
          handleKeyDown
        }
        placeholder="Type message..."
        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-3 outline-none text-white"
      />

      {/* VOICE RECORDER */}

      <VoiceRecorder
        recording={recording}
        startRecording={
          startRecording
        }
        stopRecording={
          stopRecording
        }
      />

      {/* SEND */}

      <button
        onClick={
          sendMessage
        }
        className="bg-amber-600 hover:bg-amber-500 transition px-6 py-3 rounded-full font-bold shrink-0"
      >

        Send

      </button>

    </div>

  );

}