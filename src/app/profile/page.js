"use client";

import { useEffect, useState } from "react";

export default function ProfilePage({
  params,
}) {

  const [user, setUser] =
    useState(null);

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [userId, setUserId] =
    useState(null);

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

      /* USER */

      const userResponse =
        await fetch(
          `http://127.0.0.1:3001/user/${userId}`
        );

      const userData =
        await userResponse.json();

      setUser(userData);

      /* POSTS */

      const postsResponse =
        await fetch(
          `http://127.0.0.1:3001/world-posts`
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