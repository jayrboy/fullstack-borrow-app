import express from 'express';
import { createTransactionType } from '../controllers/transaction-type-controller.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/transaction-type:
 *   post:
 *     tags:
 *       - Transaction Types
 *     summary: Create a new transaction type
 *     description: Adds a new transaction type to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type_id:
 *                 type: number
 *                 description: Unique identifier for the transaction type
 *                 example: 1
 *               type_name:
 *                 type: string
 *                 description: Name of the transaction type
 *                 example: "Deposit"
 *     responses:
 *       201:
 *         description: Create
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Transaction type created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     type_id:
 *                       type: number
 *                       example: 1
 *                     type_name:
 *                       type: string
 *                       example: "Deposit"
 *       400:
 *         description: Transaction type already exists
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
 *                   example: "Transaction type already exists"
 *       500:
 *         description: Error creating transaction type
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
 *                   example: "Error creating transaction type"
 *                 error:
 *                   type: string
 *                   example: "Internal server error details"
 */
router.post('/transaction-type', auth, createTransactionType);

export default router;
