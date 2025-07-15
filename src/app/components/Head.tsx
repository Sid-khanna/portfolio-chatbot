'use client';

export default function Head() {
  return (
    <div className="flex flex-col items-center text-center space-y-3 mb-6">
      <img
        src="/pfp.JPG"
        className="w-24 h-24 rounded-full border-2 border-white"
        alt="Sid's profile"
      />
      <h1 className="text-3xl font-bold">hello, i’m sid khanna.</h1>
      <div className="space-y-1">
        <div className="bg-black px-4 py-1 rounded text-sm">
          ↳ robotics + ai @ uoft • graduated ’25
        </div>
        <div className="bg-black px-4 py-1 rounded text-sm">
          ↳ obsessed with drones, stereo vision & LLMs
        </div>
      </div>
    </div>
  );
}
