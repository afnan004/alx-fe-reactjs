// src/App.jsx
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./components/PostsComponent";

// Create a client (default options show caching clearly)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // data considered fresh for 30s (no refetch on re-mount during this time)
      staleTime: 30_000,
      // keep cached data in memory for 5 min after unmount
      cacheTime: 5 * 60 * 1000,
      // retry network errors up to 2 times
      retry: 2,
      // show last data while refetching (nice UX)
      keepPreviousData: true,
      // don’t auto-refetch on window focus (easier to see cache)
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ minHeight: "100vh", background: "#f7fafc" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
          <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>React Query Demo</h1>
            <button
              onClick={() => setShowPosts((s) => !s)}
              style={{
                marginLeft: "auto",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #cbd5e0",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              {showPosts ? "Go to About (unmount posts)" : "Back to Posts"}
            </button>
          </header>

          <main style={{ marginTop: 16 }}>
            {showPosts ? (
              <PostsComponent />
            ) : (
              <div
                style={{
                  background: "#fff",
                  padding: 16,
                  borderRadius: 12,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <h2 style={{ fontSize: 18, fontWeight: 600 }}>About</h2>
                <p style={{ marginTop: 8 }}>
                  This page exists so you can navigate away and then back to
                  <strong> Posts</strong> to observe caching behavior. When you return
                  within the configured <code>staleTime</code>, data comes from cache
                  instantly, with no network request.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* If you installed the devtools, uncomment below to inspect cache live */}
      {/*
      <ReactQueryDevtools initialIsOpen={false} />
      */}
    </QueryClientProvider>
  );
}
