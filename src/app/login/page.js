"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

export default function LoginPage() {

  /* ===================================
     STATES
  =================================== */

  const [username,
    setUsername] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  /* ===================================
     AUTO LOGIN
  =================================== */

  useEffect(() => {

    const token =
      localStorage.getItem(
        "swala_token"
      );

    if (token) {

      window.location.href =
        "/";

    }

  }, []);

  /* ===================================
     LOGIN
  =================================== */

  async function loginUser() {

    try {

      setLoading(true);

      setError("");

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              username,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (data.error) {

        setError(
          data.error
        );

        return;

      }

      /* SAVE TOKEN */

      localStorage.setItem(
        "swala_token",
        data.token
      );

      /* SAVE USER */

      localStorage.setItem(
        "swala_user",
        JSON.stringify(
          data.user
        )
      );

      /* REDIRECT */

      window.location.href =
        "/";

    } catch (err) {

      console.error(err);

      setError(
        "Unable to login"
      );

    } finally {

      setLoading(false);

    }

  }

  /* ===================================
     ENTER KEY
  =================================== */

  function handleKeyDown(
    e
  ) {

    if (
      e.key === "Enter"
    ) {

      loginUser();

    }

  }

  return (

    <main className="min-h-screen bg-[#1a120b] text-white flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-6 sm:p-8 shadow-2xl">

        {/* LOGO */}

        <div className="flex flex-col items-center justify-center text-center">

          <Image
            src="/swala-logo.png"
            alt="Swala"
            width={120}
            height={120}
            priority
            className="object-contain -ml-2"
          />

          <h1 className="text-4xl font-bold text-amber-500 -mt-5">

            Swala

          </h1>

          <p className="text-zinc-400 mt-3 text-sm sm:text-base">

            Welcome back

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
            placeholder="Enter username"
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
            placeholder="Enter password"
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

        {/* BUTTON */}

        <button
          onClick={loginUser}
          disabled={loading}
          className="w-full mt-7 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 transition rounded-2xl py-4 font-bold text-lg"
        >

          {loading
            ? "Signing In..."
            : "Login"}

        </button>

        {/* REGISTER */}

        <button
          onClick={() => {

            window.location.href =
              "/register";

          }}
          className="w-full mt-5 text-zinc-400 hover:text-white transition text-sm sm:text-base"
        >

          Create new account

        </button>

      </div>

    </main>

  );

}