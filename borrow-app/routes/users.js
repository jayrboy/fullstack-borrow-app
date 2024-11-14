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
 *     description: This endpoint allows you to add money to a specified user's account and record the transaction.
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
 *                   example: 200
 *       400:
 *         description: Transaction type not found
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
 *                   example: "Transaction type not found"
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
 *     summary: Borrow money from one user to another
 *     description: This endpoint allows a user to borrow money and records the transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the user borrowing money
 *                 example: "6123456789abcdef01234567"
 *               money:
 *                 type: number
 *                 description: Amount of money to borrow
 *                 example: 100
 *               update_by:
 *                 type: string
 *                 description: The ID or name of the person processing the update
 *                 example: "admin"
 *               user_id:
 *                 type: string
 *                 description: The ID of the user receiving the money
 *                 example: "6789abcdef01234561234567"
 *     responses:
 *       200:
 *         description: Money borrowed and transaction recorded successfully
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
 *                   example: 300
 *       404:
 *         description: User or user to update not found
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
 *       400:
 *         description: Transaction type not found
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
 *                   example: "Transaction type not found"
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
 *     summary: Process a refund from one user to another
 *     description: This endpoint allows a user to return borrowed money and records the transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the user returning the money
 *                 example: "6123456789abcdef01234567"
 *               money:
 *                 type: number
 *                 description: Amount of money to refund
 *                 example: 100
 *               update_by:
 *                 type: string
 *                 description: The ID or name of the person processing the update
 *                 example: "admin"
 *               user_id:
 *                 type: string
 *                 description: The ID of the user receiving the refund
 *                 example: "6789abcdef01234561234567"
 *     responses:
 *       200:
 *         description: Money refunded and transaction recorded successfully
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
 *                   example: "Refund processed and transaction recorded successfully"
 *                 data:
 *                   type: number
 *                   example: 300
 *       404:
 *         description: User or user to update not found
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
 *       400:
 *         description: Transaction type not found
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
 *                   example: "Transaction type not found"
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
