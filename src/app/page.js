"use client";

import {
  useState,
  useEffect,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  useSearchParams,
} from "next/navigation";

import Chats from "./components/Chats";
import ChatScreen from "./components/ChatScreen";

import StatusList from "./components/StatusList";

import Notifications from "./components/Notifications";

import NotificationToast
from "./components/NotificationToast";

import WorldFeed
from "./components/WorldFeed";

import WorldViewer
from "./components/WorldViewer";

import CallScreen
from "./components/CallScreen";

import socket
from "./services/socket";

export default function Home() {

  /* ===================================
     SPLASH
  =================================== */

  const [
    showSplash,
    setShowSplash,
  ] = useState(true);

  /* ===================================
     SEARCH PARAMS
  =================================== */

  const searchParams =
    useSearchParams();

  /* ===================================
     MAIN STATES
  =================================== */

  const [
    activeTab,
    setActiveTab,
  ] = useState("world");

  const [
    selectedChat,
    setSelectedChat,
  ] = useState(null);

  const [
    selectedPost,
    setSelectedPost,
  ] = useState(null);

  const [
    user,
    setUser,
  ] = useState(null);

  const [
    groups,
    setGroups,
  ] = useState([]);

  /* ===================================
     NOTIFICATIONS
  =================================== */

  const [
    notificationCount,
    setNotificationCount,
  ] = useState(0);

  const [
    toastNotification,
    setToastNotification,
  ] = useState(null);

  /* ===================================
     CALL STATES
  =================================== */

  const [
    incomingCall,
    setIncomingCall,
  ] = useState(null);

  const [
    activeCall,
    setActiveCall,
  ] = useState(null);

  const [
    outgoingCall,
    setOutgoingCall,
  ] = useState(null);

  /* ===================================
     SPLASH TIMER
  =================================== */

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setShowSplash(false);

      }, 1500);

    return () =>
      clearTimeout(timer);

  }, []);

  /* ===================================
     URL TAB
  =================================== */

  useEffect(() => {

    const tab =
      searchParams.get("tab");

    if (tab) {

      setActiveTab(tab);

    }

  }, [searchParams]);

  /* ===================================
     AUTH
  =================================== */

  useEffect(() => {

    const token =
      localStorage.getItem(
        "swala_token"
      );

    const savedUser =
      localStorage.getItem(
        "swala_user"
      );

    if (!token) {

      window.location.href =
        "/register";

      return;

    }

    if (
      savedUser &&
      savedUser !== "undefined"
    ) {

      const parsedUser =
        JSON.parse(savedUser);

      setUser(parsedUser);

      socket.emit(
        "user_online",
        parsedUser.id
      );

      loadNotifications(
        parsedUser.id
      );

      loadGroups(
        parsedUser.id
      );

    }

  }, []);

  /* ===================================
     SOCKET CALL LISTENER
  =================================== */

  useEffect(() => {

    socket.on(
      "incoming_call",
      (data) => {

        const savedUser =
          localStorage.getItem(
            "swala_user"
          );

        if (!savedUser)
          return;

        const currentUser =
          JSON.parse(savedUser);

        if (
          Number(data.receiverId) ===
          Number(currentUser.id)
        ) {

          setIncomingCall(data);

        }

      }
    );

    return () => {

      socket.off(
        "incoming_call"
      );

    };

  }, []);

  /* ===================================
     ACCEPT CALL
  =================================== */

  function acceptCall() {

    if (!incomingCall)
      return;

    setActiveCall({
      ...incomingCall,
      connected: true,
    });

    setIncomingCall(null);

  }

  /* ===================================
     REJECT CALL
  =================================== */

  function rejectCall() {

    setIncomingCall(null);

  }

  /* ===================================
     START CALL
  =================================== */

  function startCall(callData) {

    if (!user)
      return;

    const newCall = {

      callerId:
        user.id,

      callerName:
        user.username,

      receiverId:
        callData.userId,

      receiverName:
        callData.name,

      type:
        callData.type,

    };

    setOutgoingCall(newCall);

    setActiveCall(newCall);

    socket.emit(
      "call_user",
      newCall
    );

  }

  /* ===================================
     END CALL
  =================================== */

  function endCall() {

    setIncomingCall(null);

    setOutgoingCall(null);

    setActiveCall(null);

  }

  /* ===================================
     LOAD NOTIFICATIONS
  =================================== */

  async function loadNotifications(
    userId
  ) {

    try {

      const response =
        await fetch(
          `http://127.0.0.1:3001/notifications/${userId}`
        );

      const data =
        await response.json();

      setNotificationCount(
        data.length
      );

      if (data.length > 0) {

        setToastNotification({
          user:
            data[0].username,

          text:
            data[0].text,
        });

      }

    } catch (err) {

      console.error(err);

    }

  }

  /* ===================================
     LOAD GROUPS
  =================================== */

  async function loadGroups(
    userId
  ) {

    try {

      const response =
        await fetch(
          `http://127.0.0.1:3001/chats/${userId}`
        );

      const data =
        await response.json();

      const realGroups =
        data.filter(
          (chat) =>
            chat.is_group
        );

      setGroups(realGroups);

    } catch (err) {

      console.error(err);

    }

  }

  /* ===================================
     SPLASH SCREEN
  =================================== */

  if (showSplash) {

    return (

      <main className="w-screen h-screen bg-[#1a120b] flex items-center justify-center">

        <div className="flex flex-col items-center justify-center">

          <Image
            src="/swala-logo.png"
            alt="Swala Logo"
            width={140}
            height={140}
            priority
            className="object-contain mx-auto"
          />

          <h1 className="text-4xl font-bold text-amber-500 -mt-4">

            Swala

          </h1>

        </div>

      </main>

    );

  }

  return (

    <main className="h-screen bg-[#1a120b] text-white overflow-hidden flex flex-col">

      {/* ===================================
          ACTIVE CALL
      =================================== */}

      {activeCall && (

        <CallScreen
          chat={{
            name:
              activeCall.receiverName ||
              activeCall.callerName ||
              "Call",
          }}
          callType={
            activeCall.type
          }
          endCall={endCall}
        />

      )}

      {/* ===================================
          INCOMING CALL
      =================================== */}

      {incomingCall && (

        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-6">

          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">

            <div className="w-28 h-28 rounded-full bg-amber-700 flex items-center justify-center text-5xl font-bold mx-auto">

              {incomingCall.callerName
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <h2 className="text-3xl font-bold mt-6">

              {
                incomingCall.callerName
              }

            </h2>

            <p className="text-zinc-400 mt-3">

              Incoming {
                incomingCall.type
              } call...
            </p>

            <div className="flex gap-4 mt-8">

              <button
                onClick={rejectCall}
                className="flex-1 bg-red-600 hover:bg-red-500 transition py-4 rounded-2xl font-bold"
              >

                Decline

              </button>

              <button
                onClick={acceptCall}
                className="flex-1 bg-green-600 hover:bg-green-500 transition py-4 rounded-2xl font-bold"
              >

                Accept

              </button>

            </div>

          </div>

        </div>

      )}

      {/* ===================================
          HEADER
      =================================== */}

      <div className="w-full bg-black border-b border-zinc-800">

        <div className="flex items-center justify-between px-6 py-4">

          <h1 className="text-3xl font-bold text-amber-600">

            Swala

          </h1>

          <div className="flex items-center gap-4">

            {user && (

              <Link
                href={`/profile/${user.id}`}
              >

                <img
                  src={
                    user.profile_picture ||
                    "https://via.placeholder.com/100"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-600"
                />

              </Link>

            )}

            <button
              onClick={() =>
                setActiveTab(
                  "notifications"
                )
              }
              className="relative text-xl"
            >

              🔔

              {notificationCount > 0 && (

                <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold px-1">

                  {notificationCount}

                </div>

              )}

            </button>

          </div>

        </div>

        {/* ===================================
            TABS
        =================================== */}

        <div className="flex items-center gap-8 px-6 pb-3 overflow-x-auto">

          {[
            "world",
            "chats",
            "groups",
            "calls",
            "status",
          ].map((tab) => (

            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`capitalize pb-2 whitespace-nowrap transition ${
                activeTab === tab
                  ? "text-amber-500 border-b-2 border-amber-500"
                  : "text-zinc-500 hover:text-white"
              }`}
            >

              {tab}

            </button>

          ))}

        </div>

      </div>

      {/* ===================================
          MAIN
      =================================== */}

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}

        <div className="w-full md:w-[380px] bg-black border-r border-zinc-800 overflow-y-auto shrink-0">

          {activeTab === "world" && (

            <WorldFeed
              openPost={
                setSelectedPost
              }
            />

          )}

          {activeTab === "chats" && (

            <Chats
              openChat={
                setSelectedChat
              }
            />

          )}

          {activeTab === "groups" && (

            <div className="p-5 text-zinc-500">

              No groups yet

            </div>

          )}

          {activeTab === "calls" && (

            <div className="p-5 text-zinc-500">

              Call history coming soon

            </div>

          )}

          {activeTab === "status" && (

            <StatusList />

          )}

          {activeTab === "notifications" && (

            <Notifications />

          )}

        </div>

        {/* RIGHT PANEL */}

        <div className="hidden md:flex flex-1 bg-zinc-950 overflow-hidden">

          {selectedChat ? (

            <ChatScreen
              selectedChat={
                selectedChat
              }
              startCall={
                startCall
              }
            />

          ) : selectedPost ? (

            <WorldViewer
              currentPost={
                selectedPost
              }
              closeViewer={() =>
                setSelectedPost(null)
              }
            />

          ) : (

            <div className="w-full h-full flex items-center justify-center">

              <div className="text-center">

                <h1 className="text-6xl font-bold text-amber-600">

                  Swala

                </h1>

                <p className="text-zinc-500 mt-5 text-lg">

                  Select a conversation or explore World posts.

                </p>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* ===================================
          TOAST
      =================================== */}

      {toastNotification && (

        <NotificationToast
          notification={
            toastNotification
          }
          closeToast={() =>
            setToastNotification(
              null
            )
          }
        />

      )}

    </main>

  );

}