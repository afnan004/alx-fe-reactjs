// src/components/Blog.jsx
import { Link } from "react-router-dom";

export default function Blog() {
  // sample post IDs
  const posts = [1, 2, 3];

  return (
    <div>
      <h1>📝 Blog</h1>
      <ul>
        {posts.map((id) => (
          <li key={id}>
            <Link to={`/blog/${id}`}>Go to Post {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
