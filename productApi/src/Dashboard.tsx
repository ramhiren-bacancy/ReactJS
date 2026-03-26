import { useEffect, useState } from "react";
import Card from "./components/Card";
import useDebounce from "./hook/useDebounce";
import type { Product,ProductResponse } from "./types/product";
import { useCart } from "./context/CartContext";
import ProductPage from "./components/ProductPage";
import Navbar from "./components/Navbar";

const BASE_URL = "https://dummyjson.com/products";


function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedSearch,setDebouncedSearch] = useDebounce(search)
  const [loading, setLoading] = useState(false);

  const limit = 10;



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
      url = `${BASE_URL}/search?q=${debouncedSearch}&limit=${limit}&skip=${page * limit}`;
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
    <div className="mx-auto my-6 ">
      <h1 className="text-3xl my-2 font-bold">Product Explorer</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          className="border rounded p-2"
        />

        <select onChange={(e) => setSortBy(e.target.value)} className="border rounded p-2">
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>

        <select onChange={(e) => setOrder(e.target.value)} className="border rounded p-2">
          <option value="">Sort Type</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSearch("")
            setDebouncedSearch("")
            setSelectedCategory(e.target.value);
            setPage(0);
          }}
          className="border rounded p-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <Navbar/>
      </div>

      <div className="gap-2 mt-6 ">
        {loading ? (
            <h2 className="text-2xl font-bold"> Loading....</h2>
        ):
        // products.map((p) => (
        //   <div key={p.id}>
        //     <Card 
        //       product={p}
        //       addCart={addCart}
        //       cart={cart}
        //       decreaseQuantity={decreaseQuantity}
        //     />
        //   </div>
        // ))
        <ProductPage products={products} />
        }
      </div>

      <div className="flex gap-2 justify-center my-4">
        <button disabled={page===0} onClick={()=>setPage(page-1)} className="border rounded px-4 disabled:opacity-50 bg-red-400">
          Prev
        </button>

        <div>
          Page {page + 1} / {totalPages}
        </div>

        <button
        disabled={page == totalPages}
          onClick={() => setPage(page + 1)}
          className="border rounded px-4 bg-green-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
