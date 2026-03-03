import React, { useEffect, useState } from "react";

const Assi_3 = () => {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Cleanup
    return;
  }, [userId]);

  return (
    <div>
      <h2>User Viewer</h2>

      <button onClick={() => setUserId(prev => prev - 1)} disabled={userId <= 1}>
        Previous
      </button>

      <button onClick={() => setUserId(prev => prev + 1)}>
        Next
      </button>

      <p>Current User ID: {userId}</p>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {user && !loading && (
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Company: {user.company?.name}</p>
        </div>
      )}
    </div>
  );
};

export default Assi_3;