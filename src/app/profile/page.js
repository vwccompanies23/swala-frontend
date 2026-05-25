"use client";

import { useEffect, useState } from "react";

export default function ProfilePage({ params }) {

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {

    async function loadParams() {

      const resolvedParams = await params;

      setUserId(resolvedParams.id);

    }

    loadParams();

  }, [params]);

  useEffect(() => {

    if (!userId) return;

    loadProfile();

  }, [userId]);

  async function loadProfile() {

    try {

      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
      );

      const userData = await userResponse.json();

      setUser(userData);

      const postsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/world-posts`
      );

      const postsData = await postsResponse.json();

      const userPosts = postsData.filter(
        (post) => post.username === userData.username
      );

      setPosts(userPosts);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (

    <div style={{ padding: "20px" }}>

      <h1>{user.username}</h1>

      <p>{user.bio}</p>

      <h2>User Posts</h2>

      {posts.length === 0 ? (

        <p>No posts yet</p>

      ) : (

        posts.map((post) => (

          <div
            key={post._id}
            style={{
              border: "1px solid #333",
              padding: "10px",
              marginBottom: "10px",
            }}
          >

            <p>{post.caption}</p>

            {post.image && (
              <img
                src={post.image}
                alt=""
                style={{ width: "100%" }}
              />
            )}

          </div>

        ))

      )}

    </div>

  );

}