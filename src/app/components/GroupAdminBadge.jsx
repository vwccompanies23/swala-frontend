"use client";

export default function GroupAdminBadge({
  role,
}) {

  if (role === "owner") {

    return (

      <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded-full">

        OWNER

      </span>

    );

  }

  if (role === "admin") {

    return (

      <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">

        ADMIN

      </span>

    );

  }

  if (role === "moderator") {

    return (

      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">

        MOD

      </span>

    );

  }

  return null;

}