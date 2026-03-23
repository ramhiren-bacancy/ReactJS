import { useEffect, useState } from "react";

const BASE_URL = "https://dummyjson.com/products";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
};

type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const limit = 10;

  function handlePrevious() {
    if (page == 0) {
      return;
    }
    setPage(page - 1);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 500); 

    return () => clearTimeout(timer); 
  }, [search]);

  useEffect(() => {
    fetch(`${BASE_URL}/category-list`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Fetch products
  useEffect(() => {
    let url = "";

    // Category filter
    if (selectedCategory) {
      url = `${BASE_URL}/category/${selectedCategory}?limit=${limit}&skip=${page * limit}`;
    }
    // Search
    else if (debouncedSearch) {
      url = `${BASE_URL}/search?q=${search}&limit=${limit}&skip=${page * limit}`;
    }
    // Default
    else {
      url = `${BASE_URL}?limit=${limit}&skip=${page * limit}`;
    }

    // Sorting
    if (sortBy) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    setLoading(true)

    fetch(url)
      .then((res) => res.json())
      .then((data: ProductResponse) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .finally(()=>{
        setLoading(false)
      })
  }, [page, debouncedSearch, sortBy, order, selectedCategory]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mx-auto">
      <h1 className="text-3xl">Product Explorer</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          className="border"
        />

        <select onChange={(e) => setSortBy(e.target.value)} className="border">
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>

        <select onChange={(e) => setOrder(e.target.value)} className="border">
          <option value="">Sort Type</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(0);
          }}
          className="border"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap">
        {loading ? (
            <h2 className="text-2xl font-bold"> Loading....</h2>
        ):
        products.map((p) => (
          <div key={p.id}>
            <img src={p.thumbnail} alt={p.title} />
            <h3>{p.title}</h3>
            <p>
              <b>id:</b> {p.id}
            </p>
            <p>
              <b>Category:</b> {p.category}
            </p>
            <p>
              <b>Price:</b> ${p.price}
            </p>
            <p>
              <b>Rating:</b> {p.rating}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-4">
        <button onClick={handlePrevious} className="border rounded px-4">
          Prev
        </button>

        <div>
          Page {page + 1} / {totalPages}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          className="border rounded px-4"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
