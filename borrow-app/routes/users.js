import express from 'express';
import {
  getUsers,
  addMoney,
  addBorrow,
  addRefund,
} from '../controllers/users-controller.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all users
 *     description: This endpoint retrieves all users from the database, excluding their passwords.
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The user ID
 *                         example: "6123456789abcdef01234567"
 *                       username:
 *                         type: string
 *                         description: The username of the user
 *                         example: "john_doe"
 *                       name:
 *                         type: string
 *                         description: The name of the user
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         description: The email address of the user
 *                         example: "john_doe@example.com"
 *       500:
 *         description: Failed to retrieve users due to a server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve users"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /api/add/money:
 *   post:
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     summary: Add money to a user's account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The user's ID
 *                 example: "6123456789abcdef01234567"
 *               money:
 *                 type: number
 *                 description: Amount of money to add
 *                 example: 100
 *               update_by:
 *                 type: string
 *                 description: The name or ID of the person updating the account
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Money added and transaction recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: number
 *                   description: Updated user balance
 *                   example: 200
 *       400:
 *         description: Bad Request - Validation error (missing or invalid fields) or Transaction type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Please provide all required fields: _id, money, and update_by."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Unexpected server error"
 *                 error:
 *                   type: string
 *                   example: "Internal server error details"
 */
router.post('/add/money', auth, addMoney);

/**
 * @swagger
 * /api/add/borrow:
 *   post:
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     summary: Borrow money from a user's account
 *     description: Deducts money from the specified user's account as a loan and records a transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of the user lending the money
 *                 example: "6123456789abcdef01234567"
 *               money:
 *                 type: number
 *                 description: Amount to borrow
 *                 example: 50
 *               update_by:
 *                 type: string
 *                 description: Identifier of the person handling the transaction
 *                 example: "admin"
 *               user_id:
 *                 type: string
 *                 description: ID of the user borrowing the money
 *                 example: "6123456789abcdef01234568"
 *     responses:
 *       200:
 *         description: Money deducted from lender and added to borrower's account successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 money:
 *                   type: number
 *                   description: Updated borrower balance
 *                   example: 150
 *       400:
 *         description: Bad Request - Validation error or transaction type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Please provide all required fields: _id, money, update_by, and user_id."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Unexpected server error"
 *                 error:
 *                   type: string
 *                   example: "Internal server error details"
 */
router.post('/add/borrow', auth, addBorrow);

/**
 * @swagger
 * /api/add/refund:
 *   post:
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     summary: Refund borrowed money to a user's account
 *     description: Adds money back to the lender’s account as a refund and records a transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of the user refunding the money
 *                 example: "6123456789abcdef01234567"
 *               money:
 *                 type: number
 *                 description: Amount to refund
 *                 example: 50
 *               update_by:
 *                 type: string
 *                 description: Identifier of the person handling the refund
 *                 example: "admin"
 *               user_id:
 *                 type: string
 *                 description: ID of the user receiving the refund
 *                 example: "6123456789abcdef01234568"
 *     responses:
 *       200:
 *         description: Money refunded successfully and transaction recorded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: number
 *                   description: Updated lender balance
 *                   example: 200
 *       400:
 *         description: Bad Request - Validation error or transaction type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Please provide all required fields: _id, money, update_by, and user_id."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Unexpected server error"
 *                 error:
 *                   type: string
 *                   example: "Internal server error details"
 */
router.post('/add/refund', auth, addRefund);

export default router;
