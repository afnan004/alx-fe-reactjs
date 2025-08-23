// src/components/PostsComponent.jsx
import { useQuery, useQueryClient } from "react-query";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetcher function (React Query calls this)
async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
}

export default function PostsComponent() {
  const queryClient = useQueryClient();

  // useQuery handles loading, error, caching, re-fetching, etc.
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery("posts", fetchPosts, {
    // (defaults also set in QueryClient, but you can override here if needed)
    // staleTime: 30_000,
  });

  return (
    <div
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginRight: 8 }}>
          Posts
        </h2>

        <button
          onClick={() => refetch()}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #cbd5e0",
            background: "#edf2f7",
            cursor: "pointer",
          }}
        >
          {isFetching ? "Refetching…" : "Refetch"}
        </button>

        <button
          onClick={() => queryClient.invalidateQueries("posts")}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #cbd5e0",
            background: "#e6fffa",
            cursor: "pointer",
          }}
          title="Marks 'posts' stale and triggers a refetch on next use"
        >
          Invalidate Cache
        </button>
      </div>

      {isLoading && <p style={{ marginTop: 12 }}>Loading posts…</p>}
      {isError && (
        <p style={{ marginTop: 12, color: "#e53e3e" }}>
          {error.message || "Something went wrong"}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <p style={{ marginTop: 8, fontSize: 12, color: "#4a5568" }}>
            {isFetching
              ? "Background updating (data shown from cache)…"
              : "Fresh or cached data shown below."}
          </p>

          <ul style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {posts.slice(0, 10).map((post) => (
              <li
                key={post.id}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                <strong>#{post.id}</strong> — {post.title}
                <p style={{ marginTop: 6, color: "#4a5568" }}>{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
