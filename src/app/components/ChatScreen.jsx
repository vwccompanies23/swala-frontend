"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import socket from "../services/socket";

import ChatInput from "./ChatInput";

export default function ChatScreen({
  selectedChat,
}) {

  const messagesEndRef =
    useRef(null);

  const [messages,
    setMessages] =
    useState([]);

  const [typing,
    setTyping] =
    useState("");

  const [currentUser,
    setCurrentUser] =
    useState(null);

  /* LOAD USER */

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "swala_user"
      );

    if (
      savedUser &&
      savedUser !== "undefined"
    ) {

      setCurrentUser(
        JSON.parse(savedUser)
      );

    }

  }, []);

  /* JOIN CHAT ROOM */

  useEffect(() => {

    if (selectedChat?.id) {

      socket.emit(
        "join_chat",
        selectedChat.id
      );

    }

  }, [selectedChat]);

  /* LOAD OLD MESSAGES */

  useEffect(() => {

    async function loadMessages() {

      try {

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/messages/${selectedChat.id}`
          );

        const data =
          await response.json();

        setMessages(data);

      } catch (err) {

        console.error(err);

      }

    }

    if (selectedChat) {

      loadMessages();

    }

  }, [selectedChat]);

  /* RECEIVE MESSAGE */

  useEffect(() => {

    socket.on(
      "receive_message",
      (data) => {

        if (
          Number(data.chat_id) ===
          Number(selectedChat?.id)
        ) {

          setMessages(
            (prev) => [
              ...prev,
              data,
            ]
          );

        }

      }
    );

    return () => {

      socket.off(
        "receive_message"
      );

    };

  }, [selectedChat]);

  /* TYPING */

  useEffect(() => {

    socket.on(
      "user_typing",
      (data) => {

        if (
          data.chatId ===
          selectedChat?.id
        ) {

          setTyping(
            `${data.name} is typing...`
          );

          setTimeout(() => {

            setTyping("");

          }, 1500);

        }

      }
    );

    return () => {

      socket.off(
        "user_typing"
      );

    };

  }, [selectedChat]);

  /* AUTO SCROLL */

  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      });

  }, [messages]);

  /* START AUDIO CALL */

  function startAudioCall() {

    if (!currentUser)
      return;

    socket.emit(
      "call_user",
      {
        callerId:
          currentUser.id,

        callerName:
          currentUser.username,

        receiverId:
          selectedChat.userId,

        type: "audio",
      }
    );

  }

  /* START VIDEO CALL */

  function startVideoCall() {

    if (!currentUser)
      return;

    socket.emit(
      "call_user",
      {
        callerId:
          currentUser.id,

        callerName:
          currentUser.username,

        receiverId:
          selectedChat.userId,

        type: "video",
      }
    );

  }

  /* EMPTY */

  if (!selectedChat) {

    return (

      <div className="flex-1 flex items-center justify-center text-zinc-500">

        Select chat

      </div>

    );

  }

  return (

    <div className="flex flex-col h-screen w-full bg-zinc-950">

      {/* HEADER */}

      <div className="p-4 border-b border-zinc-800 flex items-center justify-between gap-4">

        {/* LEFT */}

        <div className="min-w-0">

          <h1 className="font-bold text-xl text-white truncate">

            {selectedChat.name ||
              selectedChat.group_name ||
              "Conversation"}

          </h1>

          {typing && (

            <p className="text-amber-400 text-sm mt-1">

              {typing}

            </p>

          )}

        </div>

        {/* CALL BUTTONS */}

        <div className="flex items-center gap-3 shrink-0">

          {/* AUDIO */}

          <button
            onClick={
              startAudioCall
            }
            className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 transition flex items-center justify-center text-xl"
          >

            📞

          </button>

          {/* VIDEO */}

          <button
            onClick={
              startVideoCall
            }
            className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 transition flex items-center justify-center text-xl"
          >

            🎥

          </button>

        </div>

      </div>

      {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

        {messages.length === 0 && (

          <div className="flex flex-1 items-center justify-center">

            <div className="text-center">

              <h2 className="text-2xl font-bold text-white">

                No Messages

              </h2>

              <p className="text-zinc-500 mt-3">

                Start the conversation.

              </p>

            </div>

          </div>

        )}

        {messages.map(
          (msg, index) => {

            const isMine =
              Number(
                msg.sender_id
              ) ===
              Number(
                currentUser?.id
              );

            return (

              <div
                key={index}
                className={`max-w-[75%] px-4 py-3 rounded-3xl ${
                  isMine
                    ? "bg-amber-600 self-end"
                    : "bg-zinc-800 self-start"
                }`}
              >

                {!isMine && (

                  <p className="text-xs text-amber-400 mb-2 font-semibold">

                    {msg.username}

                  </p>

                )}

                {/* TEXT MESSAGE */}

                {msg.message_type !==
                  "voice" && (

                  <p className="text-white break-words">

                    {msg.message}

                  </p>

                )}

                {/* VOICE MESSAGE */}

                {msg.message_type ===
                  "voice" && (

                  <div className="flex flex-col gap-3 min-w-[240px]">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center text-xl">

                        🎤

                      </div>

                      <div className="flex-1">

                        <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">

                          <div className="w-[40%] h-full bg-white rounded-full" />

                        </div>

                      </div>

                    </div>

                    <audio
                      controls
                      src={
                        msg.voice_url
                      }
                      className="w-full"
                    />
                  </div>

                )}

                {/* TIME */}

                <p className="text-[10px] text-zinc-300 mt-2 text-right">

                  {msg.created_at
                    ? new Date(
                        msg.created_at
                      ).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : ""}

                </p>

              </div>

            );

          }
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* INPUT */}

      <div className="border-t border-zinc-800 p-3">

        <ChatInput
          selectedChat={
            selectedChat
          }

          startCall={(data) => {

            socket.emit(
              "call_user",
              {
                callerId:
                  currentUser.id,

                callerName:
                  currentUser.username,

                receiverId:
                  data.userId,

                type:
                  data.type,
              }
            );

          }}
        />

      </div>

    </div>

  );

}