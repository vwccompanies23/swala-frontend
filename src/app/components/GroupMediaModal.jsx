"use client";

export default function GroupMediaModal({
  closeModal,
}) {

  const media = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  ];

  return (

    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">

          <div>

            <h2 className="text-2xl font-bold text-white">

              Group Media

            </h2>

            <p className="text-zinc-500 text-sm mt-1">

              Photos, videos & shared files

            </p>

          </div>

          <button
            onClick={closeModal}
            className="text-2xl text-zinc-400"
          >
            ✕
          </button>

        </div>

        {/* MEDIA GRID */}
        <div className="max-h-[75vh] overflow-y-auto p-5">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

            {media.map((item, index) => (

              <div
                key={index}
                className="relative overflow-hidden rounded-3xl bg-zinc-900 aspect-square group"
              >

                <img
                  src={item}
                  alt="group media"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}