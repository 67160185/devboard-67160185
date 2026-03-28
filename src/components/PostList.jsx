import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";
import { useFavorites } from "../context/FavoritesContext";

function PostList() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");

      const data = await res.json();
      setPosts(data.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#2d3748",
            borderBottom: "2px solid #1e40af",
            paddingBottom: "0.5rem",
          }}
        >
          โพสต์ล่าสุด
        </h2>

        <button onClick={fetchPosts}>🔄 โหลดใหม่</button>
      </div>

      {/* ✅ ใช้ filtered */}
      <PostCount count={filtered.length} />

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 && <p>ไม่พบโพสต์ที่ค้นหา</p>}

      {filtered.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => toggleFavorite(post.id)} // ✅ แก้แล้ว
        />
      ))}
    </div>
  );
}

export default PostList;