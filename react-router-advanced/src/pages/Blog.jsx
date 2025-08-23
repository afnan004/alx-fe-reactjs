import { Link } from "react-router-dom";

export default function Blog() {
  // Fake posts
  const posts = [
    { id: 1, title: "React Router Basics" },
    { id: 2, title: "Advanced Routing with Guards" },
    { id: 3, title: "Dynamic Nested Routes" },
  ];

  return (
    <div>
      <h1>📝 Blog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`/blog/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
