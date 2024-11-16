import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      })
      .catch((error) => console.log('Error to fetch users: ' + error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
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
              <h4>ผู้ใช้: {u.name}</h4>
              <p>ยอดเงินปัจจุบัน: {u.money} บาท</p>
              <button
                className="action-button"
                onClick={() => navigate(`/debt-report/${u._id}`)}
              >
                ประวัติการยืม/การคืนเงิน
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default HomePage;
