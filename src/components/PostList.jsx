import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";

function PostList({ posts, favorites, onToggleFavorite }) {

  const [search, setSearch] = useState("");

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>โพสต์ล่าสุด</h2>

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <PostCount count={posts.length} />

      {filtered.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;