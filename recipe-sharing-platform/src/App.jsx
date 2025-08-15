function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full p-8 rounded-2xl shadow bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Recipe Sharing Platform</h1>
        <p className="text-gray-600 text-center">
          Tailwind CSS is working if this text is styled.
        </p>
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Test Button
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
