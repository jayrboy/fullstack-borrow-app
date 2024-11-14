import { Transaction, User } from '../models.js';

export const getTransactionSummary = async (req, res) => {
  try {
    const { id } = req.params; // รับ user_id จาก URL params

    const transactions = await Transaction.find({ user_id: id }).exec();

    if (!transactions) {
      return res.status(404).json({
        status: 404,
        message: 'No transactions found for this user',
      });
    }

    // ตัวแปรสำหรับเก็บยอดรวมของ ยืมเงิน และ คืนเงิน
    let totalBorrow = 0;
    let totalRefund = 0;

    // ใช้ for...of เพื่อวนลูปผ่าน transactions
    for (let t of transactions) {
      if (t.status === 'ยืมเงิน') {
        totalBorrow += t.money; // รวมยอดยืมเงิน
      } else if (t.status === 'คืนเงิน') {
        totalRefund += t.money; // รวมยอดคืนเงิน
      }
    }

    // คำนวณยอดหนี้ทั้งหมด (ยืมเงิน - คืนเงิน)
    const totalDebt = totalBorrow - totalRefund;

    // ดึงข้อมูลยอดเงินปัจจุบันของผู้ใช้
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    // คำนวณยอดเงินสุทธิของผู้ใช้ (ยอดเงินปัจจุบัน - ยอดหนี้)
    const currentBalance = user.money - totalDebt;

    // ส่งผลลัพธ์กลับ
    res.status(200).json({
      status: 200,
      message: 'Success',
      data: {
        user_id: id,
        current_balance: currentBalance,
        total_debt: totalDebt,
        transactions: transactions,
      },
    });
  } catch (error) {
    console.error('Error fetching transaction summary:', error);
    res.status(500).json({
      status: 500,
      message: 'Error fetching transaction summary',
      error: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).exec();

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Unexpected server error',
      error: error.message,
    });
  }
};
