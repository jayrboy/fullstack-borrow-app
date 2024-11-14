import { Transaction, User } from '../models.js';

export const getTransactionSummary = async (req, res) => {
  try {
    const { id } = req.params; // รับ user_id จาก URL params

    // ค้นหาธุรกรรมทั้งหมดที่เกี่ยวข้องกับ user_id นี้
    const transactions = await Transaction.find({ user_id: id }).exec();

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No transactions found for this user',
      });
    }

    // คำนวณยอดหนี้ทั้งหมดที่ผู้ใช้ต้องจ่าย
    const totalDebt = transactions.reduce(
      (total, transaction) => total + transaction.money,
      0
    );

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
