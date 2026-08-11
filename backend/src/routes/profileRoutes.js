import { Router } from 'express'
import { getProfiles, createProfile, updateProfile, deleteProfile } from '../controllers/profileController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.use(protect)

router.get('/', getProfiles)
router.post('/', createProfile)
router.put('/:profileId', updateProfile)
router.delete('/:profileId', deleteProfile)

export default router
