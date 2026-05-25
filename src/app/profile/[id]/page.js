"use client";

import {
  useEffect,
  useState,
} from "react";

export default function ProfilePage({
  params,
}) {

  const [userId,
    setUserId] =
    useState(null);

  const [user,
    setUser] =
    useState(null);

  const [posts,
    setPosts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [editingBio,
    setEditingBio] =
    useState(false);

  const [bio,
    setBio] =
    useState("");

  /* SOCIAL LINKS */

  const [youtube,
    setYoutube] =
    useState("");

  const [tiktok,
    setTiktok] =
    useState("");

  const [instagram,
    setInstagram] =
    useState("");

  /* LOAD PARAMS */

  useEffect(() => {

    async function loadParams() {

      const resolvedParams =
        await params;

      setUserId(
        resolvedParams.id
      );

    }

    loadParams();

  }, [params]);

  /* LOAD PROFILE */

  useEffect(() => {

    if (!userId) return;

    loadProfile();

  }, [userId]);

  async function loadProfile() {

    try {

      const userResponse =
        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
           );

      const userData =
        await userResponse.json();

      setUser(userData);

      setBio(
        userData.bio || ""
      );

      setYoutube(
        userData.youtube || ""
      );

      setTiktok(
        userData.tiktok || ""
      );

      setInstagram(
        userData.instagram || ""
      );

      const postsResponse =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/world-posts`
        );

      const postsData =
        await postsResponse.json();

      const userPosts =
        postsData.filter(
          (post) =>
            post.username ===
            userData.username
        );

      setPosts(userPosts);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  /* SAVE BIO */

  async function saveBio() {

    try {

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-bio/${userId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            bio,
            youtube,
            tiktok,
            instagram,
          }),
        }
      );

      setUser({
        ...user,
        bio,
        youtube,
        tiktok,
        instagram,
      });

      setEditingBio(false);

    } catch (err) {

      console.error(err);

    }

  }

  /* MESSAGE */

/* MESSAGE */

async function openMessage() {

  try {

    const savedUser =
      localStorage.getItem(
        "swala_user"
      );

    if (
      !savedUser ||
      savedUser === "undefined"
    ) {

      return;

    }

    const currentUser =
      JSON.parse(savedUser);

    /* CREATE OR GET CHAT */

    const response =
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-chat`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userOne:
              currentUser.id,

            userTwo:
              userId,
          }),
        }
      );

    if (!response.ok) {

      throw new Error(
        "Failed to create chat"
      );

    }

    const chat =
      await response.json();

    /* OPEN CHAT */

    window.location.href =
      `/?tab=chats&chat=${chat.id}`;

  } catch (err) {

    console.error(
      "MESSAGE ERROR:",
      err
    );

  }

}

/* CALL */

async function openCall() {

  try {

    const savedUser =
      localStorage.getItem(
        "swala_user"
      );

    if (
      !savedUser ||
      savedUser === "undefined"
    ) {

      return;

    }

    const currentUser =
      JSON.parse(savedUser);

    /* START REAL CALL */

    const response =
      await fetch(
       `${process.env.NEXT_PUBLIC_API_URL}/start-call`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            callerId:
              currentUser.id,

            receiverId:
              userId,

            type:
              "audio",
          }),
        }
      );

    if (!response.ok) {

      throw new Error(
        "Failed to start call"
      );

    }

    /* OPEN CALL SCREEN */

    window.location.href =
      `/?tab=calls&user=${userId}`;

  } catch (err) {

    console.error(
      "CALL ERROR:",
      err
    );

  }

}

  /* SETTINGS */

  function openSettings() {

    window.location.href =
      "/settings";

  }

  /* PROFILE PHOTO */

  function uploadProfilePhoto(
    e
  ) {

    const file =
      e.target.files[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setUser({
      ...user,
      profile_picture:
        imageUrl,
    });

  }

  /* COVER PHOTO */

  function uploadCoverPhoto(
    e
  ) {

    const file =
      e.target.files[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setUser({
      ...user,
      cover_photo:
        imageUrl,
    });

  }

  /* LOADING */

  if (loading) {

    return (

      <main className="min-h-screen bg-[#0f0f16] flex items-center justify-center text-white">

        Loading...

      </main>

    );

  }

  /* NO USER */

  if (!user) {

    return (

      <main className="min-h-screen bg-[#0f0f16] flex items-center justify-center text-red-500">

        User not found

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#0f0f16] text-white overflow-x-hidden">

      {/* TOP BAR */}

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

          Swala

        </h1>

        <button
          onClick={openSettings}
          className="text-3xl"
        >

          ⚙️

        </button>

      </div>

      {/* PROFILE */}

      <div className="max-w-4xl mx-auto px-4 pb-20">

        {/* COVER */}

        <div className="relative mt-6 rounded-3xl overflow-hidden border border-zinc-800">

          <div
            className="w-full h-[240px] md:h-[320px] bg-gradient-to-r from-amber-500 to-orange-600"
            style={{
              backgroundImage:
                user.cover_photo
                  ? `url(${user.cover_photo})`
                  : undefined,

              backgroundSize:
                "cover",

              backgroundPosition:
                "center",
            }}
          />

          {/* COVER BUTTON */}

          <label className="absolute right-4 bottom-4 bg-black/70 hover:bg-black transition px-4 py-2 rounded-2xl cursor-pointer text-sm">

            Change Cover

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={
                uploadCoverPhoto
              }
            />

          </label>

        </div>

        {/* PROFILE IMAGE */}

        <div className="flex justify-center -mt-24 relative z-20">

          <div className="relative">

            <img
              src={
                user.profile_picture ||
                "https://via.placeholder.com/300"
              }
              alt="profile"
              className="w-44 h-44 rounded-full object-cover border-4 border-[#0f0f16] shadow-2xl bg-zinc-900"
            />

            <label className="absolute bottom-2 right-2 bg-amber-500 hover:bg-amber-400 transition w-11 h-11 rounded-full flex items-center justify-center cursor-pointer text-black font-bold text-xl">

              +

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={
                  uploadProfilePhoto
                }
              />

            </label>

          </div>

        </div>

        {/* NAME */}

        <div className="text-center mt-5">

          <h1 className="text-5xl font-bold text-white">

            {user.username}

          </h1>

          <p className="text-zinc-400 mt-3 text-lg">

            {user.phone ||
              "No phone number"}

          </p>

        </div>

        {/* ACTION BUTTONS */}

        <div className="flex flex-wrap justify-center gap-4 mt-8">

          <button
            onClick={openMessage}
            className="bg-amber-500 hover:bg-amber-400 transition text-black font-bold px-8 py-3 rounded-2xl"
          >

            Message

          </button>

          <button
            onClick={openCall}
            className="bg-zinc-800 hover:bg-zinc-700 transition px-8 py-3 rounded-2xl font-bold"
          >

            Call

          </button>

          <button
            onClick={openSettings}
            className="bg-zinc-800 hover:bg-zinc-700 transition px-8 py-3 rounded-2xl font-bold"
          >

            Settings

          </button>

        </div>

        {/* INFO BOX */}

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          {!editingBio ? (

            <div>

              <p className="text-zinc-200 text-lg leading-9 whitespace-pre-wrap break-words">

                {user.bio ||
                  "No bio yet"}
              </p>

              <button
                onClick={() =>
                  setEditingBio(
                    true
                  )
                }
                className="mt-5 text-amber-400 font-medium"
              >

                Edit Profile
              </button>

            </div>

          ) : (

            <div className="space-y-5">

              {/* BIO */}

              <div>

                <p className="mb-2 text-zinc-400">

                  Bio

                </p>

                <textarea
                  value={bio}
                  onChange={(e) =>
                    setBio(
                      e.target.value
                    )
                  }
                  rows={5}
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none"
                />

              </div>

              {/* YOUTUBE */}

              <div>

                <p className="mb-2 text-zinc-400">

                  YouTube Link

                </p>

                <input
                  type="text"
                  value={youtube}
                  onChange={(e) =>
                    setYoutube(
                      e.target.value
                    )
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none"
                  placeholder="https://youtube.com/..."
                />

              </div>

              {/* TIKTOK */}

              <div>

                <p className="mb-2 text-zinc-400">

                  TikTok Link

                </p>

                <input
                  type="text"
                  value={tiktok}
                  onChange={(e) =>
                    setTiktok(
                      e.target.value
                    )
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none"
                  placeholder="https://tiktok.com/..."
                />

              </div>

              {/* INSTAGRAM */}

              <div>

                <p className="mb-2 text-zinc-400">

                  Instagram Link

                </p>

                <input
                  type="text"
                  value={instagram}
                  onChange={(e) =>
                    setInstagram(
                      e.target.value
                    )
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none"
                  placeholder="https://instagram.com/..."
                />

              </div>

              {/* SAVE */}

              <div className="flex gap-3 flex-wrap">

                <button
                  onClick={saveBio}
                  className="bg-amber-500 hover:bg-amber-400 transition text-black font-bold px-6 py-3 rounded-2xl"
                >

                  Save Profile

                </button>

                <button
                  onClick={() =>
                    setEditingBio(
                      false
                    )
                  }
                  className="bg-zinc-800 hover:bg-zinc-700 transition px-6 py-3 rounded-2xl"
                >

                  Cancel

                </button>

              </div>

            </div>

          )}

        </div>

        {/* SOCIAL LINKS */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">

            Links

          </h2>

          <div className="flex flex-wrap gap-5">

            {youtube && (

              <a
                href={youtube}
                target="_blank"
                className="bg-zinc-900 hover:bg-zinc-800 transition rounded-3xl p-5 text-5xl border border-zinc-800"
              >

                ▶️

              </a>

            )}

            {tiktok && (

              <a
                href={tiktok}
                target="_blank"
                className="bg-zinc-900 hover:bg-zinc-800 transition rounded-3xl p-5 text-5xl border border-zinc-800"
              >

                🎵

              </a>

            )}

            {instagram && (

              <a
                href={instagram}
                target="_blank"
                className="bg-zinc-900 hover:bg-zinc-800 transition rounded-3xl p-5 text-5xl border border-zinc-800"
              >

                📸

              </a>

            )}

          </div>

        </div>

        {/* POSTS */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">

            World Posts

          </h2>

          {posts.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-500 text-lg">

              No posts yet

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {posts.map(
                (post) => (

                  <div
                    key={post.id}
                    className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800"
                  >

                    {post.media_url && (

                      post.media_type ===
                      "video" ? (

                        <video
                          controls
                          className="w-full max-h-[500px] object-cover"
                        >

                          <source
                            src={
                              post.media_url
                            }
                          />

                        </video>

                      ) : (

                        <img
                          src={
                            post.media_url
                          }
                          alt="post"
                          className="w-full max-h-[500px] object-cover"
                        />

                      )

                    )}

                    <div className="p-5">

                      <p className="text-zinc-200 leading-8 break-words">

                        {post.caption}

                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </main>

  );

}