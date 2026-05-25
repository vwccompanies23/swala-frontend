"use client";

import Link from "next/link";

export default function SettingsPage() {

  return (

    <main className="min-h-screen bg-[#0f0f16] text-white">

      {/* HEADER */}

      <div className="w-full border-b border-zinc-800 px-5 py-4 flex items-center justify-between">

        <button
          onClick={() =>
            window.history.back()
          }
          className="text-3xl text-amber-400"
        >

          ←

        </button>

        <h1 className="text-3xl font-bold text-amber-400">

          Settings

        </h1>

        <div />

      </div>

      {/* CONTENT */}

      <div className="max-w-2xl mx-auto p-5 space-y-5">

        {/* ACCOUNT */}

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5">

          <h2 className="text-2xl font-bold mb-5">

            Account

          </h2>

          <button
            className="w-full text-left bg-zinc-800 hover:bg-zinc-700 transition p-4 rounded-2xl"
          >

            Edit Profile

          </button>

        </div>

        {/* LEGAL */}

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5">

          <h2 className="text-2xl font-bold mb-5">

            Legal

          </h2>

          <div className="space-y-4">

            <Link href="/privacy">

              <div className="bg-zinc-800 hover:bg-zinc-700 transition p-4 rounded-2xl">

                Privacy Policy

              </div>

            </Link>

            <Link href="/terms">

              <div className="bg-zinc-800 hover:bg-zinc-700 transition p-4 rounded-2xl">

                Terms & Conditions

              </div>

            </Link>

            <Link href="/community-policy">

              <div className="bg-zinc-800 hover:bg-zinc-700 transition p-4 rounded-2xl">

                Community Policy

              </div>

            </Link>

          </div>

        </div>

        {/* LOGOUT */}

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5">

          <button
            onClick={() => {

              localStorage.removeItem(
                "swala_token"
              );

              localStorage.removeItem(
                "swala_user"
              );

              window.location.href =
                "/register";

            }}
            className="w-full bg-red-600 hover:bg-red-500 transition py-4 rounded-2xl font-bold"
          >

            Logout

          </button>

        </div>

      </div>

    </main>

  );

}