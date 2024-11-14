import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>" split to ["Bearer", "token"]

    if (!token) {
      return res
        .status(401)
        .json({ status: 401, message: 'No Token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      status: 401,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};
