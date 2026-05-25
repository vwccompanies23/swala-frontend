"use client";

export default function IncomingCall({
  caller,
  acceptCall,
  declineCall,
}) {

  return (

    <div className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center p-6">

      {/* AVATAR */}
      <div className="w-40 h-40 rounded-full bg-amber-600 flex items-center justify-center text-6xl font-bold">

        {caller?.name?.charAt(0)}

      </div>

      {/* INFO */}
      <div className="text-center mt-8">

        <h1 className="text-4xl font-bold text-white">

          {caller?.name}

        </h1>

        <p className="text-zinc-400 text-lg mt-3">

          Incoming Call...

        </p>

      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-10 mt-16">

        {/* DECLINE */}
<button
  onClick={declineCall}
  className="w-24 h-24 rounded-full bg-red-600 hover:bg-red-500 transition flex items-center justify-center text-4xl rotate-[135deg]"
>
  📞
</button>

{/* ACCEPT */}
<button
  onClick={acceptCall}
  className="w-24 h-24 rounded-full bg-green-600 hover:bg-green-500 transition flex items-center justify-center text-4xl"
>
  📞
</button>

      </div>

    </div>

  );

}