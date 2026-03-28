import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CommentList from "./CommentList";

function PostCard({ id, title, body }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);
  const [showComments, setShowComments] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem" }}>
        <Link
          to={`/posts/${id}`} // ✅ ใช้ id
          style={{ color: "#1e40af", textDecoration: "none" }}
        >
          {title}
        </Link>
      </h3>

      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {body}
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => toggleFavorite(id)} // ✅ ใช้ id
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {showComments ? "▲ ซ่อน" : "▼ ดูความคิดเห็น"}
        </button>
      </div>

      {showComments && <CommentList postId={id} />} {/* ✅ ใช้ id */}
    </div>
  );
}

export default PostCard;