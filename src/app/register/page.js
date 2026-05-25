"use client";

import { useState } from "react";

import Image from "next/image";

export default function RegisterPage() {

  /* ===================================
     STATES
  =================================== */

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ===================================
     REGISTER
  =================================== */

  async function registerUser() {

    try {

      setLoading(true);

      setError("");

      /* VALIDATION */

      if (
        !username ||
        !password ||
        !confirmPassword
      ) {

        setError(
          "Please fill all fields"
        );

        return;

      }

      if (
        password !==
        confirmPassword
      ) {

        setError(
          "Passwords do not match"
        );

        return;

      }

      if (
        password.length < 6
      ) {

        setError(
          "Password must be at least 6 characters"
        );

        return;

      }

      /* SAVE TEMP DATA */

      localStorage.setItem(
        "swala_register_username",
        username
      );

      localStorage.setItem(
        "swala_register_password",
        password
      );

      /* GO TO PHONE PAGE */

      window.location.href =
        "/phone";

    } catch (err) {

      console.error(err);

      setError(
        "Unable to continue"
      );

    } finally {

      setLoading(false);

    }

  }

  /* ===================================
     ENTER KEY
  =================================== */

  function handleKeyDown(e) {

    if (
      e.key === "Enter"
    ) {

      registerUser();

    }

  }

  return (

    <main className="min-h-screen bg-[#1a120b] text-white flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-6 sm:p-8 shadow-2xl">

        {/* LOGO */}

        <div className="flex flex-col items-center text-center">

          <Image
            src="/swala-logo.png"
            alt="Swala"
            width={120}
            height={120}
            priority
            className="object-contain"
          />

          <h1 className="text-4xl font-bold text-amber-500 -mt-3">

            Swala

          </h1>

          <p className="text-zinc-400 mt-2 text-sm sm:text-base">

            Create your account

          </p>

        </div>

        {/* ERROR */}

        {error && (

          <div className="w-full bg-red-500/20 border border-red-500 text-red-300 rounded-2xl px-4 py-3 text-sm mt-6 text-center">

            {error}

          </div>

        )}

        {/* USERNAME */}

        <div className="mt-8">

          <label className="text-sm text-zinc-400">

            Username

          </label>

          <input
            type="text"
            placeholder="Choose username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition"
          />

        </div>

        {/* PASSWORD */}

        <div className="mt-5">

          <label className="text-sm text-zinc-400">

            Password

          </label>

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition"
          />

        </div>

        {/* CONFIRM */}

        <div className="mt-5">

          <label className="text-sm text-zinc-400">

            Confirm Password

          </label>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition"
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={registerUser}
          disabled={loading}
          className="w-full mt-7 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 transition rounded-2xl py-4 font-bold text-lg"
        >

          {loading
            ? "Continuing..."
            : "Continue"}

        </button>

        {/* LOGIN */}

        <button
          onClick={() => {

            window.location.href =
              "/login";

          }}
          className="w-full mt-5 text-zinc-400 hover:text-white transition text-sm sm:text-base"
        >

          Already have account? Login

        </button>

      </div>

    </main>

  );

}