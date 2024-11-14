import express from 'express';
import {
  getTransactions,
  getTransactionSummary,
} from '../controllers/debt-report-controller.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/debt-report/{id}:
 *   get:
 *     summary: Get transaction summary for a user
 *     description: Fetches all transactions for a specific user and calculates the current balance and total debt.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to fetch the transaction summary for.
 *     responses:
 *       200:
 *         description: Successful response with transaction summary
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
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       example: "61e6c68bcf1a4c2a4a8c89b6"
 *                     current_balance:
 *                       type: number
 *                       example: 500
 *                     total_debt:
 *                       type: number
 *                       example: 100
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           transaction_id:
 *                             type: string
 *                             example: "61e6c68bcf1a4c2a4a8c89b7"
 *                           money:
 *                             type: number
 *                             example: 50
 *                           status:
 *                             type: string
 *                             example: "borrow"
 *       404:
 *         description: User or transactions not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Error fetching transaction summary
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
 *                   example: Error fetching transaction summary
 *                 error:
 *                   type: string
 *                   example: "Unexpected server error"
 */
router.get('/debt-report/:id', auth, getTransactionSummary);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     description: Fetches all transactions from the database.
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: Successful response with a list of transactions
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
 *                       transaction_id:
 *                         type: string
 *                         example: "61e6c68bcf1a4c2a4a8c89b6"
 *                       user_id:
 *                         type: string
 *                         example: "61e6c68bcf1a4c2a4a8c89b7"
 *                       money:
 *                         type: number
 *                         example: 50
 *                       status:
 *                         type: string
 *                         example: "borrow"
 *                       date:
 *                         type: string
 *                         example: "2024-11-14T12:34:56.000Z"
 *       500:
 *         description: Error fetching transactions
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
 *                   example: "Unexpected server error"
 *                 error:
 *                   type: string
 *                   example: "Error fetching transaction summary"
 */
router.get('/transactions', auth, getTransactions);

export default router;
