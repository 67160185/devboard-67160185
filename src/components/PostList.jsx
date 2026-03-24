import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  // fetch function (เรียกได้หลายที่)
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

  // โหลดครั้งแรก
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
      {/* หัวข้อ + ปุ่มโหลดใหม่ */}
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

        <button
          onClick={fetchPosts}
          style={{
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      {/* นับจำนวนโพสต์ */}
      <PostCount count={posts.length} />

      {/* ช่องค้นหา */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
        }}
      />

      {/* ถ้าไม่เจอ */}
      {filtered.length === 0 && <p>ไม่พบโพสต์ที่ค้นหา</p>}

      {/* แสดงโพสต์ */}
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;