import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config()

import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import mediaRoutes from './routes/mediaRoutes.js'
import listRoutes from './routes/listRoutes.js'
import watchHistoryRoutes from './routes/watchHistoryRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { db } from './config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Security & Parsing Middlewares
app.use(helmet({ contentSecurityPolicy: false }))
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
  })
)
app.use(express.json())

// Healthcheck
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mediaCount: db.data.media.length,
    usersCount: db.data.users.length
  })
})

// API Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profiles', profileRoutes)
app.use('/api/v1/media', mediaRoutes)
app.use('/api/v1/list', listRoutes)
app.use('/api/v1/watch-history', watchHistoryRoutes)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

// Global Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Netflix Backend Server running on http://localhost:${PORT}`)
})
