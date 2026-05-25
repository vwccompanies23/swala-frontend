"use client";

import {
  useEffect,
  useState,
} from "react";

import WorldPostCard
from "./WorldPostCard";

import CreateWorldPostModal
from "./CreateWorldPostModal";

export default function WorldFeed({
  openPost,
}) {

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);

  const [
    posts,
    setPosts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* =========================
     LOAD POSTS
  ========================= */

  useEffect(() => {

    async function loadPosts() {

      try {

        setLoading(true);

        const response =
          await fetch(
            "http://127.0.0.1:3001/world-posts"
          );

        /* CHECK RESPONSE */

        if (!response.ok) {

          throw new Error(
            `Server error: ${response.status}`
          );

        }

        /* PARSE JSON */

        const data =
          await response.json();

        /* MAKE SURE ARRAY */

        if (
          Array.isArray(data)
        ) {

          setPosts(data);

        } else {

          console.error(
            "Invalid posts data"
          );

          setPosts([]);

        }

      } catch (err) {

        console.error(
          "WORLD POSTS ERROR:",
          err
        );

        setPosts([]);

      } finally {

        setLoading(false);

      }

    }

    loadPosts();

  }, []);

  /* =========================
     REMOVE EXPIRED POSTS
  ========================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setPosts((prev) =>
          prev.filter(
            (post) => {

              const expires =
                post.expires_at ||
                post.expiresAt;

              if (!expires)
                return true;

              return (
                new Date(
                  expires
                ) > new Date()
              );

            }
          )
        );

      }, 60000);

    return () =>
      clearInterval(interval);

  }, []);

  /* =========================
     CREATE POST
  ========================= */

  function createPost(
    newPost
  ) {

    setPosts((prev) => {

      const exists =
        prev.some(
          (post) =>
            post.id ===
            newPost.id
        );

      if (exists) {

        return prev;

      }

      return [
        newPost,
        ...prev,
      ];

    });

  }

  /* =========================
     OPEN POST
  ========================= */

  function handleOpenPost(
    post
  ) {

    setPosts((prev) =>
      prev.map((item) => {

        if (
          item.id ===
          post.id
        ) {

          return {
            ...item,
            views:
              (item.views || 0) + 1,
          };

        }

        return item;

      })
    );

    openPost(post);

  }

  return (

    <div className="relative h-full flex flex-col bg-black">

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto min-h-0">

        {/* CONTAINER */}
        <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 md:px-6 py-5 md:py-7">

          {/* HEADER */}
          <div className="mb-7">

            <h1 className="text-3xl md:text-5xl font-bold text-white">

              World

            </h1>

            <p className="text-zinc-500 mt-3 text-sm md:text-base leading-relaxed">

              Temporary posts that disappear automatically.

            </p>

          </div>

          {/* LOADING */}
          {loading && (

            <div className="flex items-center justify-center py-24">

              <p className="text-zinc-500 text-lg">

                Loading posts...

              </p>

            </div>

          )}

          {/* POSTS */}
          {!loading &&
            posts.length > 0 && (

            <div className="flex flex-col gap-6 md:gap-8">

              {posts.map(
                (
                  post,
                  index
                ) => (

                  <WorldPostCard
                    key={`${post.id}-${index}`}
                    post={post}
                    openPost={
                      handleOpenPost
                    }
                  />

                )
              )}

            </div>

          )}

          {/* EMPTY */}
          {!loading &&
            posts.length ===
              0 && (

            <div className="flex flex-col items-center justify-center py-24 text-center">

              <div className="text-7xl">

                🌍

              </div>

              <h2 className="text-3xl font-bold text-white mt-6">

                No World Posts

              </h2>

              <p className="text-zinc-500 mt-4 max-w-md leading-relaxed">

                Temporary posts from users will appear here.

              </p>

            </div>

          )}

        </div>

      </div>

      {/* CREATE BUTTON */}
      {!showCreateModal && (

        <button
          onClick={() =>
            setShowCreateModal(
              true
            )
          }
          className="absolute bottom-5 right-5 md:bottom-7 md:right-7 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-600 hover:bg-amber-500 transition shadow-2xl flex items-center justify-center text-3xl md:text-4xl"
        >

          +

        </button>

      )}

      {/* CREATE MODAL */}
      {showCreateModal && (

        <CreateWorldPostModal
          closeModal={() =>
            setShowCreateModal(
              false
            )
          }
          createPost={
            createPost
          }
        />

      )}

    </div>

  );

}