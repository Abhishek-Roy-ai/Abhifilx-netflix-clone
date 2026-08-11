import { verifyToken } from '../utils/jwt.js'
import { db } from '../config/db.js'

export function protect(req, res, next) {
  let token = null

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Not authorized, invalid or expired token' })
  }

  const user = db.data.users.find((u) => u.id === decoded.id)
  if (!user) {
    return res.status(401).json({ success: false, message: 'User no longer exists' })
  }

  const { passwordHash, ...safeUser } = user
  req.user = safeUser
  next()
}
