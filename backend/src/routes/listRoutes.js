import { Router } from 'express'
import { getMyList, addToMyList, removeFromMyList } from '../controllers/listController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.use(protect)

router.get('/', getMyList)
router.post('/add', addToMyList)
router.post('/remove', removeFromMyList)

export default router
