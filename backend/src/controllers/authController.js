import bcrypt from 'bcryptjs'
import { db } from '../config/db.js'
import { generateToken } from '../utils/jwt.js'

export async function register(req, res) {
  const { email, password, name } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  const existingUser = db.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim())
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists with this email' })
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
  const newUser = {
    id: userId,
    email: email.toLowerCase().trim(),
    passwordHash,
    createdAt: new Date().toISOString()
  }

  db.data.users.push(newUser)

  // Default initial profile for user
  const defaultProfile = {
    id: `prof_${Date.now()}_1`,
    userId: userId,
    name: name || email.split('@')[0] || 'User',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
    isKids: false,
    createdAt: new Date().toISOString()
  }

  db.data.profiles.push(defaultProfile)
  db.save()

  const token = generateToken({ id: newUser.id })
  const { passwordHash: _, ...safeUser } = newUser

  return res.status(201).json({
    success: true,
    token,
    user: safeUser,
    profiles: [defaultProfile]
  })
}

export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  const user = db.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim())
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash)
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  const userProfiles = db.data.profiles.filter((p) => p.userId === user.id)
  const token = generateToken({ id: user.id })
  const { passwordHash: _, ...safeUser } = user

  return res.json({
    success: true,
    token,
    user: safeUser,
    profiles: userProfiles
  })
}

export async function getMe(req, res) {
  const userProfiles = db.data.profiles.filter((p) => p.userId === req.user.id)
  return res.json({
    success: true,
    user: req.user,
    profiles: userProfiles
  })
}
