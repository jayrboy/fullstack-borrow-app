import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DebtReport = () => {
  const { id } = useParams();
  let [loading, setLoading] = useState(true); // Initialize loading state
  let [debtReport, setDebtReport] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/debt-report/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDebtReport(data.data);
      })
      .catch((error) => console.log('Error to fetch users: ' + error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Debt Report Page</h1>
      {loading ? (
        <div className="loading-spinner" style={{ textAlign: 'center' }}>
          <p>กำลังโหลด...</p>
        </div>
      ) : (
        <div className="card">
          <h4>ยอดคงเหลือ: {debtReport.current_balance}</h4>
          <h4>หนี้สินทั้งหมด: {debtReport.total_debt}</h4>
          {debtReport.transactions.map((t) => {
            let cdt = new Date(Date.parse(t.createdAt));
            let cdf = (
              <>
                {cdt.getDate()}-{cdt.getMonth() + 1}-{cdt.getFullYear()}
              </>
            );
            return (
              <div key={t._id} className="user-card">
                <h4>วันที่: {cdf}</h4>
                <h4>ผู้ใช้: {t.update_by}</h4>
                <p>ยืมเงิน: {t.borrow_by}</p>
                <p>คืนเงิน: {t.refund_by}</p>
                <p>จำนวน: {t.money} บาท</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default DebtReport;
