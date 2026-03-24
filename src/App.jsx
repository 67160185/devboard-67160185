import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserCard from "./components/UserCard";
import AddPostForm from "./components/AddPostForm";

function App() {
  const INITIAL_POSTS = [];

const USERS = [
  { id: 1, name: "John Doe", email: "john@test.com" },
  { id: 2, name: "Jane Doe", email: "jane@test.com" },
];
  
const [posts, setPosts] = useState(INITIAL_POSTS);
const [favorites, setFavorites] = useState([]);
  
  function handleToggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  // เพิ่มโพสต์ใหม่
  function handleAddPost({ title, body }) {
    const newPost = {
      id: Date.now(),
      title,
      body,
    };
    setPosts((prev) => [newPost, ...prev]);
  }

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />

      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย */}
        <div>
          <AddPostForm onAddPost={handleAddPost} />

          <PostList
            posts={posts} // ✅ ตอนนี้มีค่าแล้ว
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* คอลัมน์ขวา */}
        <div>
          <h2
            style={{
              color: "#2d3748",
              borderBottom: "2px solid #1e40af",
              paddingBottom: "0.5rem",
            }}
          >
            สมาชิก
          </h2>

          {USERS.map((user) => (
            <UserCard key={user.id} name={user.name} email={user.email} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;