"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import socket from "../services/socket";

import CallControls
from "./CallControls";

import useNetworkStatus
from "../hooks/useNetworkStatus";

export default function CallScreen({
  chat,
  endCall,
}) {

  /* =========================
     REFS
  ========================= */

  const localAudioRef =
    useRef(null);

  const remoteAudioRef =
    useRef(null);

  const peerConnection =
    useRef(null);

  const localStream =
    useRef(null);

  /* =========================
     STATES
  ========================= */

  const [muted,
    setMuted] =
    useState(false);

  const [videoEnabled,
    setVideoEnabled] =
    useState(false);

  const [callStatus,
    setCallStatus] =
    useState("Connecting...");

  const [callSeconds,
    setCallSeconds] =
    useState(0);

  const [recording,
    setRecording] =
    useState(false);

  const [minimized,
    setMinimized] =
    useState(false);

  const [remoteUser] =
    useState(
      chat?.name || "User"
    );

  const {
    isOnline,
    connectionType,
  } =
    useNetworkStatus();

  /* =========================
     LOW INTERNET
  ========================= */

  const lowInternetMode =

    connectionType ===
      "2g" ||

    connectionType ===
      "slow-2g" ||

    connectionType ===
      "3g";

  /* =========================
     TIMER
  ========================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCallSeconds(
          (prev) =>
            prev + 1
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  /* =========================
     FORMAT TIME
  ========================= */

  function formatTime(
    seconds
  ) {

    const mins =
      Math.floor(
        seconds / 60
      );

    const secs =
      seconds % 60;

    return `${mins
      .toString()
      .padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;

  }

  /* =========================
     CREATE PEER
  ========================= */

  async function createPeer() {

    peerConnection.current =
      new RTCPeerConnection({

        iceServers: [

          {
            urls:
              "stun:stun.l.google.com:19302",
          },

        ],

    });

    /* =========================
       REMOTE TRACK
    ========================= */

    peerConnection.current.ontrack =
      (event) => {

        const remoteStream =
          event.streams[0];

        if (
          remoteAudioRef.current
        ) {

          remoteAudioRef.current.srcObject =
            remoteStream;

        }

        setCallStatus(
          "Connected"
        );

      };

    /* =========================
       ICE CANDIDATE
    ========================= */

    peerConnection.current.onicecandidate =
      (event) => {

        if (
          event.candidate
        ) {

          socket.emit(
            "ice_candidate",
            {
              targetUserId:
                chat.userId,

              candidate:
                event.candidate,
            }
          );

        }

      };

    /* =========================
       CONNECTION STATUS
    ========================= */

    peerConnection.current.onconnectionstatechange =
      () => {

        const state =
          peerConnection.current
            ?.connectionState;

        if (
          state ===
          "connected"
        ) {

          setCallStatus(
            "Connected"
          );

        }

        if (
          state ===
          "disconnected"
        ) {

          setCallStatus(
            "Disconnected"
          );

        }

        if (
          state ===
          "failed"
        ) {

          setCallStatus(
            "Connection Failed"
          );

        }

      };

  }

  /* =========================
     START LOCAL STREAM
  ========================= */

  async function startLocalAudio() {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({

          audio: {

            echoCancellation: true,

            noiseSuppression: true,

            autoGainControl: true,

          },

          video: false,

        });

      localStream.current =
        stream;

      if (
        localAudioRef.current
      ) {

        localAudioRef.current.srcObject =
          stream;

      }

      stream
        .getTracks()
        .forEach((track) => {

          peerConnection.current.addTrack(
            track,
            stream
          );

        });

    } catch (err) {

      console.error(err);

      setCallStatus(
        "Microphone denied"
      );

    }

  }

  /* =========================
     CREATE OFFER
  ========================= */

  async function createOffer() {

    try {

      const offer =
        await peerConnection.current.createOffer({

          offerToReceiveAudio:
            true,

          offerToReceiveVideo:
            false,

        });

      await peerConnection.current.setLocalDescription(
        offer
      );

      socket.emit(
        "call_user",
        {
          callerId:
            chat.callerId,

          callerName:
            chat.callerName,

          receiverId:
            chat.userId,

          type: "audio",

          offer,
        }
      );

    } catch (err) {

      console.error(err);

    }

  }

  /* =========================
     ANSWER OFFER
  ========================= */

  async function answerOffer() {

    try {

      if (!chat.offer)
        return;

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(
          chat.offer
        )
      );

      const answer =
        await peerConnection.current.createAnswer();

      await peerConnection.current.setLocalDescription(
        answer
      );

      socket.emit(
        "answer_call",
        {
          callerId:
            chat.callerId,

          answer,
        }
      );

      setCallStatus(
        "Connected"
      );

    } catch (err) {

      console.error(err);

    }

  }

  /* =========================
     INIT
  ========================= */

  useEffect(() => {

    async function init() {

      await createPeer();

      await startLocalAudio();

      /* =========================
         IF CALLER
      ========================= */

      if (
        !chat.offer
      ) {

        await createOffer();

      }

      /* =========================
         IF RECEIVER
      ========================= */

      else {

        await answerOffer();

      }

    }

    init();

  }, []);

  /* =========================
     RECEIVE ANSWER
  ========================= */

  useEffect(() => {

    socket.on(
      "call_answered",
      async (data) => {

        try {

          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(
              data.answer
            )
          );

          setCallStatus(
            "Connected"
          );

        } catch (err) {

          console.error(err);

        }

      }
    );

    return () => {

      socket.off(
        "call_answered"
      );

    };

  }, []);

  /* =========================
     RECEIVE ICE
  ========================= */

  useEffect(() => {

    socket.on(
      "ice_candidate",
      async (data) => {

        try {

          if (
            data.candidate
          ) {

            await peerConnection.current.addIceCandidate(
              new RTCIceCandidate(
                data.candidate
              )
            );

          }

        } catch (err) {

          console.error(err);

        }

      }
    );

    return () => {

      socket.off(
        "ice_candidate"
      );

    };

  }, []);

  /* =========================
     CALL ENDED
  ========================= */

  useEffect(() => {

    socket.on(
      "call_ended",
      () => {

        cleanup();

      }
    );

    socket.on(
      "call_rejected",
      () => {

        setCallStatus(
          "Call Rejected"
        );

        setTimeout(() => {

          cleanup();

        }, 1500);

      }
    );

    return () => {

      socket.off(
        "call_ended"
      );

      socket.off(
        "call_rejected"
      );

    };

  }, []);

  /* =========================
     CLEANUP
  ========================= */

  function cleanup() {

    if (
      peerConnection.current
    ) {

      peerConnection.current.close();

    }

    if (
      localStream.current
    ) {

      localStream.current
        .getTracks()
        .forEach((track) =>
          track.stop()
        );

    }

    endCall();

  }

  /* =========================
     END CALL
  ========================= */

  function handleEndCall() {

    socket.emit(
      "end_call",
      {
        targetUserId:
          chat.userId,
      }
    );

    cleanup();

  }

  /* =========================
     TOGGLE MUTE
  ========================= */

  function toggleMute() {

    if (
      !localStream.current
    ) return;

    localStream.current
      .getAudioTracks()
      .forEach((track) => {

        track.enabled =
          muted;

      });

    setMuted(!muted);

  }

  /* =========================
     MINIMIZED
  ========================= */

  if (minimized) {

    return (

      <div className="fixed bottom-24 right-4 z-[700] w-40 h-52 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

        <button
          onClick={() =>
            setMinimized(false)
          }
          className="absolute top-2 right-2 z-20 bg-black/60 w-8 h-8 rounded-full flex items-center justify-center text-white"
        >

          ⛶

        </button>

        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">

          <div className="w-20 h-20 rounded-full bg-amber-700 flex items-center justify-center text-3xl font-bold">

            {remoteUser
              ?.charAt(0)}

          </div>

          <h2 className="text-white font-bold mt-4 text-sm">

            {remoteUser}

          </h2>

          <p className="text-green-400 text-xs mt-2">

            Audio Call

          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="fixed inset-0 z-[500] bg-black flex flex-col overflow-hidden">

      {/* AUDIO */}

      <audio
        ref={localAudioRef}
        autoPlay
        muted
      />

      <audio
        ref={remoteAudioRef}
        autoPlay
      />

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />

      {/* TOP */}

      <div className="absolute top-0 left-0 w-full z-30 p-5 flex items-center justify-between">

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl px-4 py-3">

          <p className="text-sm text-zinc-300">

            🌍
            {" "}
            {lowInternetMode
              ? "Low Internet Mode"
              : "Strong Connection"}

          </p>

        </div>

        <div className="bg-black/60 rounded-2xl px-5 py-3">

          <p className="text-green-400 font-semibold">

            {formatTime(
              callSeconds
            )}

          </p>

        </div>

      </div>

      {/* MINIMIZE */}

      <div className="absolute top-24 left-5 z-40">

        <button
          onClick={() =>
            setMinimized(true)
          }
          className="w-14 h-14 rounded-full bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center text-2xl"
        >

          ➖

        </button>

      </div>

      {/* CENTER */}

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6">

        <div className="w-52 h-52 rounded-full bg-amber-700 flex items-center justify-center text-8xl font-bold shadow-2xl">

          {remoteUser?.charAt(0)}

        </div>

        <h1 className="text-5xl font-bold text-white mt-8 text-center">

          {remoteUser}

        </h1>

        <p className="text-green-400 mt-4 text-lg">

          {callStatus}

        </p>

        {!isOnline && (

          <p className="text-red-500 mt-5">

            Waiting for internet...
          </p>

        )}

      </div>

      {/* RECORD */}

      <div className="absolute bottom-44 right-5">

        <button
          onClick={() =>
            setRecording(
              !recording
            )
          }
          className={`w-14 h-14 rounded-full transition flex items-center justify-center text-2xl ${
            recording
              ? "bg-red-600"
              : "bg-zinc-900"
          }`}
        >

          ⏺

        </button>

      </div>

      {/* CONTROLS */}

      <CallControls
        muted={muted}
        setMuted={toggleMute}
        videoEnabled={
          videoEnabled
        }
        setVideoEnabled={
          setVideoEnabled
        }
        endCall={
          handleEndCall
        }
      />

    </div>

  );

}