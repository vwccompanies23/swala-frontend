"use client";

import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import MessageBubble from "./MessageBubble";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ProfileModal from "./ProfileModal";
import GroupSettingsModal from "./GroupSettingsModal";
import GroupMembersModal from "./GroupMembersModal";
import GroupAboutModal from "./GroupAboutModal";
import GroupPinnedBanner from "./GroupPinnedBanner";
import useNetworkStatus from "../hooks/useNetworkStatus";
import GroupPinnedMessages from "./GroupPinnedMessages";

import useGroupPermissions from "../groups/hooks/useGroupPermissions";

import canSendMessage from "../groups/utils/canSendMessage";
import canEditGroup from "../groups/utils/canEditGroup";
import canDeleteMessage from "../groups/utils/canDeleteMessage";
import CallScreen from "./CallScreen";
import VideoCallScreen from "./VideoCallScreen";
import IncomingCall from "./IncomingCall";

const socket = io("http://localhost:3001");

export default function ChatRoom({
  chat,
  closeChat,
}) {

  /* MODALS */

  const [showProfile,
    setShowProfile] =
      useState(false);

  const [showMembers,
    setShowMembers] =
      useState(false);

  const [showGroupInfo,
    setShowGroupInfo] =
      useState(false);

  const [showPinnedMessages,
    setShowPinnedMessages] =
      useState(false);

  const [showGroupSettings,
    setShowGroupSettings] =
      useState(false);

      const [voiceCall,
  setVoiceCall] =
    useState(false);

const [videoCall,
  setVideoCall] =
    useState(false);

const [incomingCall,
  setIncomingCall] =
    useState(false);

    const [incomingCaller,
  setIncomingCaller] =
    useState(null);

  /* CHAT */

  const [message, setMessage] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [typing,
    setTyping] =
      useState(false);

      const [typingUser,
  setTypingUser] =
    useState(null);

  const [recording,
    setRecording] =
      useState(false);

  const [replyingTo,
    setReplyingTo] =
      useState(null);

  const [search,
    setSearch] =
      useState("");

  const [editingMessage,
    setEditingMessage] =
      useState(null);

      const [queuedMessages,
  setQueuedMessages] =
    useState([]);

    /* NETWORK */

const {
  isOnline,
  connectionType,
} = useNetworkStatus();

  /* GROUP ROLE */

  const currentUserRole =
    chat?.currentUserRole ||
    "member";

  const permissions =
    useGroupPermissions(
      currentUserRole
    );

  const groupLocked =
    chat?.locked || false;

  const pinnedMessage =
    chat?.type === "group"
      ? "Deployment starts tonight 🚀"
      : null;

  const userCanSend =
    canSendMessage({
      locked: groupLocked,
      role: currentUserRole,
    });

  const userCanEditGroup =
    canEditGroup(
      permissions
    );

  const userCanDeleteMessages =
    canDeleteMessage(
      permissions
    );

  /* AUDIO */

  const mediaRecorderRef =
    useRef(null);

  const audioChunksRef =
    useRef([]);

  /* MESSAGES */

  const [messages,
    setMessages] =
      useState([
        {
          id: Date.now(),

          text:
            "Welcome to Swala chat 🚀",

          sender: "System",

          role: "system",

          status: "seen",

          reactions: [],

          pinned: true,

          announcement: true,

          time:
            new Date().toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
        },
      ]);

  /* SOCKET */

  useEffect(() => {

    socket.on(
  "user_typing",
  (data) => {

    socket.on(
  "recording",
  (data) => {

    if (
      data.status
    ) {

      chat.status =
        "recording";

    } else {

      chat.status =
        "online";

    }

  }
);

    setTypingUser(
      data.name
    );

    setTimeout(() => {

      setTypingUser(
        null
      );

    }, 2000);

  }
);

    socket.on(
      "receive_message",
      (data) => {

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),

            text: data.message,

            image: data.image,

            audio: data.audio,

            sender:
              data.sender,

            role:
              data.role ||
              "member",

            status:
              data.status ||
              "seen",

            reactions: [],

            time: data.time,
          },
        ]);

      }
    );


    return () => {

      socket.off(
        "receive_message"
      );

    };

  }, []);

  /* DELETE */

  function deleteMessage(
    id
  ) {

    setMessages((prev) =>
      prev.filter(
        (msg) =>
          msg.id !== id
      )
    );

  }

 async function handleImage(
  e
) {

  const file =
    e.target.files[0];

  if (!file) return;

  const img =
    document.createElement(
      "img"
    );

  const reader =
    new FileReader();

  reader.onload = (
    event
  ) => {

    img.src =
      event.target.result;

  };

  img.onload = () => {

    const canvas =
      document.createElement(
        "canvas"
      );

    const ctx =
      canvas.getContext("2d");

    let width =
      img.width;

    let height =
      img.height;

    const maxWidth = 1280;

    if (
      width > maxWidth
    ) {

      height *=
        maxWidth /
        width;

      width =
        maxWidth;

    }

    canvas.width =
      width;

    canvas.height =
      height;

    ctx.drawImage(
      img,
      0,
      0,
      width,
      height
    );

    const compressed =
      canvas.toDataURL(
        "image/jpeg",
        0.7
      );

    setImage(
      compressed
    );

  };

  reader.readAsDataURL(
    file
  );

}

  /* RECORD */

  async function startRecording() {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            audio: true,
          }
        );

      const mediaRecorder =
        new MediaRecorder(
          stream
        );

      mediaRecorderRef.current =
        mediaRecorder;

      audioChunksRef.current =
        [];

      mediaRecorder.ondataavailable =
        (event) => {

          audioChunksRef.current.push(
            event.data
          );

        };

      mediaRecorder.onstop =
        () => {

          const audioBlob =
            new Blob(
              audioChunksRef.current,
              {
                type:
                  "audio/webm",
              }
            );

          /* COMPRESS AUDIO */

const compressedAudio =
  new Blob(
    [audioBlob],
    {
      type:
        "audio/webm;codecs=opus",
    }
  );

const audioUrl =
  URL.createObjectURL(
    compressedAudio
  );

          const audioMessage =
            {
              id: Date.now(),

              audio: audioUrl,

              compressed: true,

              sender: "You",

              role:
                currentUserRole,

              status: "sent",

              time:
                new Date().toLocaleTimeString(
                  [],
                  {
                    hour:
                      "2-digit",

                    minute:
                      "2-digit",
                  }
                ),
            };

          setMessages((prev) => [
            ...prev,
            audioMessage,
          ]);

          /* DELIVERED */
          setTimeout(() => {

            setMessages((prev) =>
              prev.map((msg) => {

                if (
                  msg.id ===
                  audioMessage.id
                ) {

                  return {
                    ...msg,
                    status:
                      "delivered",
                  };

                }

                return msg;

              })
            );

          }, 1000);

          /* SEEN */
          setTimeout(() => {

            setMessages((prev) =>
              prev.map((msg) => {

                if (
                  msg.id ===
                  audioMessage.id
                ) {

                  return {
                    ...msg,
                    status:
                      "seen",
                  };

                }

                return msg;

              })
            );

          }, 2500);

        };

      mediaRecorder.start();

      setRecording(true);

    } catch (err) {

      console.error(err);

    }

  }

  function stopRecording() {

    if (
      !mediaRecorderRef.current
    )
      return;

    mediaRecorderRef.current.stop();

    setRecording(false);

  }

  /* SEND */

  function sendMessage() {

    if (!userCanSend) {

      alert(
        "Only admins can send messages right now"
      );

      return;

    }

    if (
      !message.trim() &&
      !image
    )
      return;

    const isAnnouncement =
      message.startsWith(
        "/announce "
      );

    const cleanMessage =
      isAnnouncement
        ? message.replace(
            "/announce ",
            ""
          )
        : message;

    const newMessage = {

      id: Date.now(),

      text: cleanMessage,

      image,

      sender: "You",

      role:
        currentUserRole,

      announcement:
        isAnnouncement,

      status: "sent",

      reply: replyingTo,

      reactions: [],

      time:
        new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",

            minute: "2-digit",
          }
        ),
    };

    if (!isOnline) {

  setQueuedMessages(
    (prev) => [
      ...prev,
      {
        ...newMessage,
        queued: true,
      },
    ]
  );

} else {

  socket.emit(
    "send_message",
    newMessage
  );

}

   setMessages((prev) => [
  ...prev,
  {
    ...newMessage,
    queued: !isOnline,
  },
]);

    /* DELIVERED */
    setTimeout(() => {

      setMessages((prev) =>
        prev.map((msg) => {

          if (
            msg.id ===
            newMessage.id
          ) {

            return {
              ...msg,
              status:
                "delivered",
            };

          }

          return msg;

        })
      );

    }, 1000);

    /* SEEN */
    setTimeout(() => {

      setMessages((prev) =>
        prev.map((msg) => {

          if (
            msg.id ===
            newMessage.id
          ) {

            return {
              ...msg,
              status: "seen",
            };

          }

          return msg;

        })
      );

    }, 2500);

    setMessage("");

    setImage(null);

    setReplyingTo(null);

  }

  /* REACTIONS */

  function addReaction(
    id,
    emoji
  ) {

    setMessages((prev) =>
      prev.map((msg) => {

        if (msg.id === id) {

          return {
            ...msg,

            reactions: [
              ...(msg.reactions ||
                []),

              emoji,
            ],
          };

        }

        return msg;

      })
    );

  }

  /* STAR */

  function starMessage(id) {

    setMessages((prev) =>
      prev.map((msg) => {

        if (msg.id === id) {

          return {
            ...msg,

            starred:
              !msg.starred,
          };

        }

        return msg;

      })
    );

  }

  /* EDIT */

  function saveEditedMessage(
    id,
    newText
  ) {

    setMessages((prev) =>
      prev.map((msg) => {

        if (msg.id === id) {

          return {
            ...msg,

            text: newText,

            edited: true,
          };

        }

        return msg;

      })
    );

    setEditingMessage(null);

  }

  /* FORWARD */

  function forwardMessage(
    messageToForward
  ) {

    const forwarded = {

      ...messageToForward,

      id: Date.now(),

      forwarded: true,

      sender: "You",

      role:
        currentUserRole,
    };

    setMessages((prev) => [
      ...prev,
      forwarded,
    ]);

  }

  /* SIMULATE INCOMING CALL */

useEffect(() => {

  const timeout =
    setTimeout(() => {

      setIncomingCaller({
        name: "Sarah",
      });

      setIncomingCall(true);

    }, 15000);

  return () =>
    clearTimeout(timeout);

}, []);

  /* START VOICE CALL */

function startVoiceCall() {

  setVoiceCall(true);

}

/* START VIDEO CALL */

function startVideoCall() {

  setVideoCall(true);

}

/* END CALL */

function endCall() {

  setVoiceCall(false);

  setVideoCall(false);

  setIncomingCall(false);

}

/* RETRY QUEUE */

useEffect(() => {

  if (
    isOnline &&
    queuedMessages.length > 0
  ) {

    queuedMessages.forEach(
      (msg) => {

        socket.emit(
          "send_message",
          msg
        );

      }
    );

    setQueuedMessages([]);

    setMessages((prev) =>
      prev.map((msg) => ({
        ...msg,
        queued: false,
      }))
    );

  }

}, [
  isOnline,
  queuedMessages,
]);

  return (

    <div className="flex-1 flex flex-col bg-black overflow-hidden">

      {/* HEADER */}

      <ChatHeader
  chat={chat}
  closeChat={closeChat}
  openProfile={() =>
    setShowProfile(true)
  }
  permissions={permissions}
  openMembers={() =>
    setShowMembers(true)
  }
  openGroupInfo={() =>
    setShowGroupInfo(true)
  }
  startVoiceCall={
    startVoiceCall
  }
  startVideoCall={
    startVideoCall
  }
/>

      {/* LOCKED NOTICE */}

      {groupLocked && (

        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">

          <p className="text-red-300 text-sm text-center">

            🔒 Only admins can send messages

          </p>

        </div>

      )}

      {/* PINNED BANNER */}
      {chat?.type === "group" && (

        <GroupPinnedBanner
          pinnedMessage={pinnedMessage}
          openPinnedMessages={() =>
            setShowPinnedMessages(true)
          }
        />

      )}

      {/* OFFLINE BANNER */}
{!isOnline && (

  <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">

    <p className="text-red-300 text-sm text-center">

      Offline mode active • Messages will send automatically once internet returns

    </p>

  </div>

)}

      {/* SEARCH */}

      <div className="p-3 border-b border-zinc-800">

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search messages..."
          className="w-full bg-zinc-900 rounded-full px-4 py-3 outline-none"
        />

      </div>

      {/* TYPING */}
{typingUser && (

  <div className="px-4 py-2">

    <div className="inline-flex items-center gap-3 bg-zinc-900 rounded-full px-4 py-2">

      <div className="flex gap-1">

        <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" />

        <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce delay-100" />

        <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce delay-200" />

      </div>

      <p className="text-sm text-zinc-300">

        {typingUser} is typing...

      </p>

    </div>

  </div>

)}

      {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages
          .filter((msg) => {

            if (!search)
              return true;

            return msg.text
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          })
          .map((msg) => (

            <MessageBubble
              key={msg.id}
              msg={msg}
              deleteMessage={
                deleteMessage
              }
              setReplyingTo={
                setReplyingTo
              }
              addReaction={
                addReaction
              }
              editingMessage={
                editingMessage
              }
              setEditingMessage={
                setEditingMessage
              }
              saveEditedMessage={
                saveEditedMessage
              }
              starMessage={
                starMessage
              }
              forwardMessage={
                forwardMessage
              }
              permissions={
                permissions
              }
              currentUserRole={
                currentUserRole
              }
              userCanDeleteMessages={
                userCanDeleteMessages
              }
            />

          ))}

      </div>

      {/* IMAGE PREVIEW */}

      {image && (

        <div className="px-4 pb-3">

          <img
            src={image}
            alt="preview"
            className="rounded-2xl max-h-52"
          />

        </div>

      )}

      {/* REPLY */}

      {replyingTo && (

        <div className="px-4 py-3 bg-zinc-900 border-t border-zinc-800">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-amber-500">

                Replying to

              </p>

              <p className="text-sm text-white truncate max-w-xs mt-1">

                {replyingTo.text ||
                  "Voice/Image"}

              </p>

            </div>

            <button
              onClick={() =>
                setReplyingTo(
                  null
                )
              }
              className="text-red-500"
            >
              ✕

            </button>

          </div>

        </div>

      )}

    {/* INPUT */}

<ChatInput
  message={message}

  setMessage={(value) => {

    setMessage(value);

    setTyping(true);

    socket.emit(
      "typing",
      {
        name: "You",
      }
    );

    setTimeout(() => {

      setTyping(false);

    }, 1000);

  }}

  sendMessage={
    sendMessage
  }

  imageChange={
    handleImage
  }

  startRecording={
    startRecording
  }

  stopRecording={
    stopRecording
  }

  setRecordingStatus={(
    status
  ) => {

    socket.emit(
      "recording",
      {
        status,
        name: "You",
      }
    );

  }}

  recording={
    recording
  }
/>

      {/* PROFILE */}

      {showProfile && (

        <div className="fixed inset-0 z-50">

          <ProfileModal
            chat={chat}
            closeProfile={() =>
              setShowProfile(false)
            }
          />

        </div>

      )}

      {/* MEMBERS */}

      {showMembers &&
        chat?.type ===
          "group" && (

        <GroupMembersModal
          group={chat}
          closeModal={() =>
            setShowMembers(false)
          }
        />

      )}

      {/* PINNED MESSAGES */}
      {showPinnedMessages && (

        <GroupPinnedMessages
          closeModal={() =>
            setShowPinnedMessages(false)
          }
        />

      )}

      {/* GROUP INFO */}

      {showGroupInfo &&
        chat?.type ===
          "group" && (

        <GroupAboutModal
          group={chat}
          closeModal={() =>
            setShowGroupInfo(false)
          }
        />

      )}

      {/* GROUP SETTINGS */}

      {showGroupSettings &&
        chat?.type ===
          "group" && (

        <div className="fixed inset-0 z-50">

          <GroupSettingsModal
            closeSettings={() =>
              setShowGroupSettings(false)
            }
          />

        </div>

      )}

      {/* VOICE CALL */}
{voiceCall && (

  <CallScreen
    chat={chat}
    endCall={endCall}
  />

)}

{/* VIDEO CALL */}
{videoCall && (

  <VideoCallScreen
    chat={chat}
    endCall={endCall}
  />

)}

{/* INCOMING CALL */}
{incomingCall && (

  <IncomingCall
    caller={incomingCaller}
    acceptCall={() => {

      setIncomingCall(false);

      setVoiceCall(true);

    }}
    declineCall={endCall}
  />

)}

    </div>

  );

}