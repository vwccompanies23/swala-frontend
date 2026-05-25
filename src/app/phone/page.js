"use client";

import { useState } from "react";

export default function PhonePage() {

  const [countryCode, setCountryCode] =
    useState("+1");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  function continueToVerify() {

    const fullPhone =
      countryCode + phoneNumber;

    localStorage.setItem(
      "swala_phone",
      fullPhone
    );

    window.location.href =
      "/verify";

  }

  return (

    <main className="min-h-screen bg-[#1a120b] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-[#24160d] border border-amber-900 rounded-3xl p-8">

        {/* LOGO */}

        <div className="flex flex-col items-center">

          <img
            src="/swala-logo.png"
            alt="Swala"
            className="w-24 h-24 object-contain"
          />

          <h1 className="text-4xl font-bold text-amber-500 -mt-2">

            Swala

          </h1>

          <p className="text-zinc-400 mt-2 text-center">

            Enter your phone number

          </p>

        </div>

        {/* COUNTRY */}

        <div className="mt-8">

          <label className="text-sm text-zinc-400">

            Country Code

          </label>

          <select
            value={countryCode}
            onChange={(e) =>
              setCountryCode(
                e.target.value
              )
            }
            className="w-full mt-2 bg-[#1a120b] border border-amber-700 rounded-2xl px-5 py-4 outline-none"
          >

            <option value="+1">
              🇺🇸 +1 USA
            </option>

            <option value="+255">
              🇹🇿 +255 Tanzania
            </option>

            <option value="+254">
              🇰🇪 +254 Kenya
            </option>

            <option value="+256">
              🇺🇬 +256 Uganda
            </option>

            <option value="+250">
              🇷🇼 +250 Rwanda
            </option>

          </select>

        </div>

        {/* PHONE */}

        <div className="mt-5">

          <label className="text-sm text-zinc-400">

            Phone Number

          </label>

          <input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(
                e.target.value
              )
            }
            className="w-full mt-2 bg-[#1a120b] border border-amber-700 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={continueToVerify}
          className="w-full mt-8 bg-amber-600 hover:bg-amber-500 transition rounded-2xl py-4 font-bold text-lg"
        >

          Continue

        </button>

      </div>

    </main>

  );

}