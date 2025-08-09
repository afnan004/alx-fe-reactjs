import UserProfile from "./components/UserProfile";
<UserProfile />
export default function App() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-4xl font-black tracking-tight">
          Tailwind + React + Vite
        </h1>

        <p className="text-lg">
          If you can see this styled text, Tailwind is configured correctly.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button className="rounded-2xl px-5 py-3 border border-gray-200 shadow-sm hover:shadow">
            Neutral Button
          </button>
          <button className="rounded-2xl px-5 py-3 bg-blue-600 text-white hover:bg-blue-700 transition">
            Primary Button
          </button>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-300 p-6">
          <p className="text-sm">
            Try editing <code className="font-mono">src/App.jsx</code> and save.
          </p>
        </div>
      </div>
    </main>
  )
}
