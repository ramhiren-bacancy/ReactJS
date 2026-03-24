import { useEffect, useRef, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import useDebounce from "./hooks/useDebounce";

const baseURL = "https://dummyjson.com/posts";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  reactions: {
    likes: number;
  };
  views: number;
};

function Scroll() {
  const [post, setPost] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const limit = 10;

  async function fetchData() {
    if (loading) return;

    setLoading(true);

    let url = baseURL;

    if (debounceQuery) {
      url = `${baseURL}/search?q=${debounceQuery}`;
    } else {
      url = `${baseURL}?limit=${limit}&skip=${limit * page}`;
    }

    if (sortBy) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setPost((prev) => [...prev, ...data.posts]);
    setTotal(data.total);

    setLoading(false);
  }

  useEffect(() => {
    setPost([]);
    setPage(0);
  }, [debounceQuery, sortBy, order]);

  useEffect(() => {
    fetchData();
  }, [page, debounceQuery, sortBy, order]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (
          first.isIntersecting &&
          !loading &&
          post.length < total
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: .7,
      }
    );

    const current = loaderRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loading, post.length, total]);

  return (
    <div className="px-4">
      <h1 className="text-4xl text-center mb-4">Posts</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          className="border px-2"
        />

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-2"
        >
          <option value="">Sort By</option>
          <option value="views">Views</option>
          <option value="title">Title</option>
        </select>

        <select
          onChange={(e) => setOrder(e.target.value)}
          className="border px-2"
        >
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-5 gap-4">
        {post.map((p) => (
          <Card key={p.id} post={p} />
        ))}
      </div>

      {/* Loader (IMPORTANT) */}
      <div ref={loaderRef} className="h-16 flex justify-center items-center">
        {loading && <p>Loading...</p>}
      </div>

      {/* End message */}
      {!loading && post.length === total && (
        <p className="text-center mt-4">No more posts</p>
      )}
    </div>
  );
}

export default Scroll;