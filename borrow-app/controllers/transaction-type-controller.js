import { TransactionType } from '../models.js';

export const createTransactionType = async (req, res) => {
  try {
    const { type_id, type_name } = req.body;

    // ตรวจสอบว่ามี type_id นี้อยู่แล้วหรือไม่
    const existingType = await TransactionType.findOne({ type_id });
    if (existingType) {
      return res.status(400).json({
        status: 400,
        message: 'Transaction type already exists',
      });
    }

    // สร้างและบันทึก transaction type ใหม่
    const transactionType = new TransactionType({ type_id, type_name });
    await transactionType.save();
    res.status(201).json({
      status: 201,
      message: 'Create',
      data: transactionType,
    });
  } catch (error) {
    console.error('Error creating transaction type:', error);
    res.status(500).json({
      status: 500,
      message: 'Error creating transaction type',
      error: error.message,
    });
  }
};
