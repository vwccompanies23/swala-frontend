"use client";

import { useState } from "react";

import Image from "next/image";

export default function VerifyPage() {

  /* ===================================
     STATES
  =================================== */

  const [code, setCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ===================================
     VERIFY
  =================================== */

  async function verifyCode() {

    try {

      setLoading(true);

      setError("");

      /* VALIDATION */

      if (code.length < 4) {

        setError(
          "Enter verification code"
        );

        return;

      }

      /* GET REGISTER DATA */

      const username =
        localStorage.getItem(
          "swala_register_username"
        );

      const password =
        localStorage.getItem(
          "swala_register_password"
        );

      const phone =
        localStorage.getItem(
          "swala_phone"
        );

      /* CREATE ACCOUNT */

      const response =
        await fetch(
          "http://127.0.0.1:3001/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              username,
              password,
              phone,
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

      /* SAVE AUTH */

      localStorage.setItem(
        "swala_token",
        data.token
      );

      localStorage.setItem(
        "swala_user",
        JSON.stringify(
          data.user
        )
      );

      /* CLEAN TEMP DATA */

      localStorage.removeItem(
        "swala_register_username"
      );

      localStorage.removeItem(
        "swala_register_password"
      );

      localStorage.removeItem(
        "swala_phone"
      );

      /* ENTER APP */

      window.location.href =
        "/?tab=world";

    } catch (err) {

      console.error(err);

      setError(
        "Verification failed"
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

      verifyCode();

    }

  }

  return (

    <main className="min-h-screen bg-[#1a120b] text-white flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-black/40 border border-zinc-800 rounded-[32px] p-8 backdrop-blur-xl shadow-2xl">

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

          <h1 className="text-4xl font-bold text-amber-500 -mt-4">

            Swala

          </h1>

          <p className="text-zinc-400 mt-3">

            Verify your phone number

          </p>

        </div>

        {/* ERROR */}

        {error && (

          <div className="w-full bg-red-500/20 border border-red-500 text-red-300 rounded-2xl px-4 py-3 text-sm mt-6 text-center">

            {error}

          </div>

        )}

        {/* CODE */}

        <div className="mt-8">

          <label className="text-sm text-zinc-400">

            Verification Code

          </label>

          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) =>
              setCode(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-amber-500 transition text-center text-2xl tracking-[10px]"
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={verifyCode}
          disabled={loading}
          className="w-full mt-7 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 transition rounded-2xl py-4 font-bold text-lg"
        >

          {loading
            ? "Verifying..."
            : "Verify"}

        </button>

      </div>

    </main>

  );

}