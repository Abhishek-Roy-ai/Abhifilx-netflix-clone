import { Router } from 'express'
import { getContinueWatching, updateProgress } from '../controllers/watchHistoryController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.use(protect)

router.get('/continue-watching', getContinueWatching)
router.post('/progress', updateProgress)

export default router
