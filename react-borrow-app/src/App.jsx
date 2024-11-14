import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    setTimeout(() => {
      // Set timeout of 3 seconds
      fetch(`${import.meta.env.VITE_API}/api/users`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUsers(data.data);
        })
        .catch((error) => console.log('Error to fetch users: ' + error))
        .finally(() => setLoading(false)); // Set loading to false when data is fetched
    }, 3000); // 3 second delay to simulate loading time
  }, []);

  return (
    <>
      {/* Navigation bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <button className="nav-button">หน้าแรก</button>
          <button className="nav-button">หนี้สินทั้งหมด</button>
          <button className="nav-button">Login</button>
        </div>
      </nav>

      {/* Main content */}
      <h1>Node.js | React | Docker | AWS</h1>
      <br />

      {/* Show Loading Spinner */}
      <h1>Home Page</h1>
      {loading ? (
        <div className="loading-spinner" style={{ textAlign: 'center' }}>
          <p>กำลังโหลด...</p>
        </div>
      ) : (
        <div className="card">
          {users.map((u) => (
            <div key={u._id} className="user-card">
              <h4>Username: {u.name}</h4>
              <button className="action-button">Borrow Money</button>
              &nbsp;
              <button className="action-button">Return Money</button>
              &nbsp;
              <button className="action-button">
                ประวัติการยืม/การคืนเงิน
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
