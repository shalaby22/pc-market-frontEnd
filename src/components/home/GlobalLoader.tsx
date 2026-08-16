export default function GlobalLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950">
      <div className="w-16 h-16 border-4 border-neutral-800 border-t-red-600 rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold text-white mb-2">loading</h2>
    </div>
  );
}
