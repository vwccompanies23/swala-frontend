export default function Loading() {

  return (

    <main className="w-full h-screen bg-black flex items-center justify-center">

      <div className="flex flex-col items-center">

        {/* LOGO */}

        <img
          src="/swala-logo.png"
          alt="Swala"
          className="w-40 h-40 object-contain animate-pulse"
        />

        {/* TEXT */}

        <h1 className="mt-6 text-4xl font-bold text-amber-500">

          Swala

        </h1>

        <p className="text-zinc-500 mt-2 text-lg">

          Connecting the world

        </p>

      </div>

    </main>

  );

}