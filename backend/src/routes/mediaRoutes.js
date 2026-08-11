import { Router } from 'express'
import {
  getHero,
  getTrending,
  getOriginals,
  getTop10,
  getMovies,
  getTVShows,
  getMediaById,
  searchMedia
} from '../controllers/mediaController.js'

const router = Router()

router.get('/hero', getHero)
router.get('/trending', getTrending)
router.get('/originals', getOriginals)
router.get('/top10', getTop10)
router.get('/movies', getMovies)
router.get('/tv', getTVShows)
router.get('/search', searchMedia)
router.get('/:id', getMediaById)

export default router
