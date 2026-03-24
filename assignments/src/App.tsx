import { useEffect, useState } from "react";
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
  views : number
};

// type Response = {
//   posts: Post[];
//   total: number;
//   skip: number;
//   limit: number;
// };

function App() {
  const [post, setPost] = useState<Post[]>([]);
  const [query, setQuery] = useState<string>("");
  const debounceQuery = useDebounce(query);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortBy,setSortBy] = useState("")
  const [order,setOrder] = useState("asc")
  const limit = 10;


  function handlePrevious() {
    if (page == 0) return;
    setPage(page - 1);
  }

  async function fetchData() {
    let url = baseURL;
    if (debounceQuery) {
      url = baseURL + `/search?q=${debounceQuery}`;
    }
    else {
      url = baseURL + `?limit=${limit}&skip=${limit * page}`;
    }

    if(sortBy){
      url += `&sortBy=${sortBy}&order=${order}`
    }

    const res = await fetch(url);
    const data = await res.json();
    setPost(data.posts);
    setTotal(data.total);
  }

  useEffect(() => {
    fetchData();
  }, [debounceQuery, page,sortBy,order]);

  const totalPages = Math.ceil(total / limit);

  console.log(post)

  return (
    <div className="px-4 flex flex-col justify-center">
      <h1 className="text-red-600 text-4xl text-center">Posts</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="name"
          id=""
          onChange={(e) => setQuery(e.target.value)}
          className="border"
        />
        <button onClick={handlePrevious} className="border rounded px-4">
          Previous
        </button>
        {page + 1} / {totalPages}
        <button
          className="border rounded px-4"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

        <select name="sort" id="" onChange={(e)=>setSortBy(e.target.value)} className="border rounded px-4">
          <option value="">select</option>
          <option value="views">views</option>
          <option value="title">title</option>
        </select>

        <select name="order" id="" onChange={(e)=>setOrder(e.target.value)} className="border rounded px-4">
          <option value="">select</option>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {post.map((p) => {
          return <Card post={p} />;
        })}
      </div>
    </div>
  );
}

export default App;
