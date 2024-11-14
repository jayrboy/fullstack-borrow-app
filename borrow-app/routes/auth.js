import express from 'express';
import {
  generateToken,
  register,
  login,
} from '../controllers/auth-controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/token:
 *   post:
 *     tags: [Authorization]
 *     summary: "Generates Token"
 *     responses:
 *       200:
 *         description: "Success"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzE2MDA1NjcsImV4cCI6MTczMTY4Njk2N30.lZ_e485eVKY1OWwljQuP7rkxAOedjA4Hq2ES4W9Jwg4"
 */
router.post('/token', generateToken);

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: [Authorization]
 *     summary: "Register a new user"
 *     description: "This endpoint registers a new user by providing a username, password, and name. If the username already exists, it returns an error."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: "password123"
 *               name:
 *                 type: string
 *                 description: The full name of the user.
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: "User successfully registered"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Register Successfully"
 *       400:
 *         description: "User already exists"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "User Already Exists!"
 *       500:
 *         description: "Unexpected server error"
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
 */
router.post('/register', register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Authorization]
 *     summary: "User login"
 *     description: "This endpoint logs in the user by verifying the username and password. If successful, it generates a token."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: "Login successful and token generated"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: "JWT token for the user"
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 payload:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     money:
 *                       type: number
 *                       example: 1000
 *       400:
 *         description: "Invalid username or password"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Password Invalid!!!"
 *       404:
 *         description: "User not found"
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
 *                   example: "User Not Found!!!"
 *       500:
 *         description: "Internal server error"
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
 *                   example: "Internal Server Error"
 */
router.post('/login', login);

export default router;
