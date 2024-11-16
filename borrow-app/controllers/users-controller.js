import { User, Transaction, TransactionType } from '../models.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').exec();
    res.status(200).json({
      status: 200,
      message: 'Success',
      data: users,
    });
  } catch (error) {
    console.log('Failed to retrieve users:', error);
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve users',
      error: error.message,
    });
  }
};

export const addMoney = (req, res) => {
  try {
    const { _id, money, update_by } = req.body;

    // Validate required fields
    if (!_id || !money || !update_by) {
      return res.status(400).json({
        status: 400,
        message:
          'Please provide all required fields: _id, money, and update_by.',
      });
    }

    // Validate data types
    if (typeof money !== 'number') {
      return res.status(400).json({
        status: 400,
        message:
          'Invalid data format: _id should be a string, money should be a number, and update_by should be a string.',
      });
    }

    User.findById(_id)
      .then(async (user) => {
        if (!user) {
          return res.status(404).send('User not found');
        }

        // เพิ่มเงินในบัญชีผู้ใช้
        user.money += money;
        await user.save();

        // ค้นหา TransactionType 1 ที่ตรงกับการ "เพิ่มเงิน"
        const transactionType = await TransactionType.findOne({ type_id: 1 });
        if (!transactionType) {
          return res.status(400).send('Transaction type not found');
        }

        // สร้างธุรกรรมใหม่
        const transaction = new Transaction({
          user_id: _id,
          status: transactionType.type_name,
          money,
          update_by,
        });
        await transaction.save();

        res.status(200).json({
          status: 200,
          message: 'Success',
          data: user.money,
        });
      })
      .catch((err) =>
        res.status(404).json({
          status: 404,
          message: 'Not found',
          error: err.message,
        })
      );
  } catch (error) {
    console.log({ message: error });
    res.status(500).json({
      status: 500,
      message: 'Unexpected server error',
      error: error.message,
    });
  }
};

export const addBorrow = async (req, res) => {
  try {
    const { _id, money, update_by, user_id } = req.body;

    // Validate required fields
    if (!_id || !money || !update_by || !user_id) {
      return res.status(400).json({
        status: 400,
        message:
          'Please provide all required fields: _id, money, update_by, and user_id.',
      });
    }

    // Check if money is a number
    if (typeof money !== 'number') {
      return res.status(400).json({
        status: 400,
        message: 'Invalid data format: money should be a number.',
      });
    }

    // Borrow money process
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    user.money -= money;
    await user.save();

    const transactionType = await TransactionType.findOne({ type_id: 2 });
    if (!transactionType) {
      return res.status(400).json({
        status: 400,
        message: 'Transaction type not found',
      });
    }

    const transaction = new Transaction({
      user_id: user_id,
      status: transactionType.type_name,
      borrow_by: user.name,
      money,
      update_by,
    });
    await transaction.save();

    const userToUpdate = await User.findById(user_id);
    if (!userToUpdate) {
      return res.status(404).json({
        status: 404,
        message: 'User to update not found',
      });
    }

    userToUpdate.money += money;
    await userToUpdate.save();

    res.status(200).json({
      status: 200,
      message: 'Success',
      money: userToUpdate.money,
    });
  } catch (error) {
    console.log({ message: error });
    res.status(500).json({
      status: 500,
      message: 'Unexpected server error',
      error: error.message,
    });
  }
};

export const addRefund = async (req, res) => {
  try {
    const { _id, money, update_by, user_id } = req.body;

    // Validate required fields
    if (!_id || !money || !update_by || !user_id) {
      return res.status(400).json({
        status: 400,
        message:
          'Please provide all required fields: _id, money, update_by, and user_id.',
      });
    }

    if (typeof money !== 'number') {
      return res.status(400).json({
        status: 400,
        message: 'Invalid data format: money should be a number.',
      });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    user.money += money;
    await user.save();

    const transactionType = await TransactionType.findOne({ type_id: 3 });
    if (!transactionType) {
      return res.status(400).json({
        status: 400,
        message: 'Transaction type not found',
      });
    }

    const transaction = new Transaction({
      user_id: user_id,
      status: transactionType.type_name,
      refund_by: user.name,
      money,
      update_by,
    });
    await transaction.save();

    const userToUpdate = await User.findById(user_id);
    if (!userToUpdate) {
      return res.status(404).json({
        status: 404,
        message: 'User to update not found',
      });
    }

    userToUpdate.money -= money;
    await userToUpdate.save();

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: userToUpdate.money,
    });
  } catch (error) {
    console.log({ message: error });
    res.status(500).json({
      status: 500,
      message: 'Unexpected server error',
      error: error.message,
    });
  }
};
