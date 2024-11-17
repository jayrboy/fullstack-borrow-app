import { useEffect, useState } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/transactions`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTransactions(data.data);
      })
      .catch((error) => console.log('Error to fetch users: ' + error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Transactions - ประวัติการทำธุรกรรมทั้งหมด</h1>

      {loading ? (
        <div className="loading-spinner" style={{ textAlign: 'center' }}>
          <p>กำลังโหลด...</p>
        </div>
      ) : (
        <div className="table-container">
          <table
            border="1"
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr>
                <th>Status</th>
                <th>Money</th>
                <th>ยืมเงิน</th>
                <th>คืนเงิน</th>
                <th>อัปเดตโดย</th>
                <th>เมื่อวันที่</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id}>
                  <td>{t.status}</td>
                  <td>
                    {t.money
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </td>
                  <td>{t.borrow_by || '-'}</td>
                  <td>{t.refund_by || '-'}</td>
                  <td>{t.update_by || '-'}</td>
                  <td>{new Date(t.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Transactions;
