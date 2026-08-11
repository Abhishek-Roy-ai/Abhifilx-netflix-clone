import { db } from '../config/db.js'

export function getHero(req, res) {
  const allMedia = db.data.media
  if (allMedia.length === 0) {
    return res.json({ success: true, hero: null })
  }
  const heroItem = allMedia.find((m) => m.isOriginal) || allMedia[0]
  return res.json({ success: true, hero: heroItem })
}

export function getTrending(req, res) {
  const trending = db.data.media.slice(0, 10)
  return res.json({ success: true, results: trending })
}

export function getOriginals(req, res) {
  const originals = db.data.media.filter((m) => m.isOriginal)
  return res.json({ success: true, results: originals.length > 0 ? originals : db.data.media.slice(0, 6) })
}

export function getTop10(req, res) {
  const top10 = db.data.media.filter((m) => m.isTop10).slice(0, 10)
  return res.json({ success: true, results: top10.length > 0 ? top10 : db.data.media.slice(0, 10) })
}

export function getMovies(req, res) {
  const { genre } = req.query
  let movies = db.data.media.filter((m) => m.type === 'movie')
  if (genre && genre !== 'All') {
    movies = movies.filter((m) => m.genres && m.genres.includes(genre))
  }
  return res.json({ success: true, results: movies })
}

export function getTVShows(req, res) {
  const { genre } = req.query
  let tvShows = db.data.media.filter((m) => m.type === 'series' || m.type === 'tv')
  if (genre && genre !== 'All') {
    tvShows = tvShows.filter((m) => m.genres && m.genres.includes(genre))
  }
  return res.json({ success: true, results: tvShows })
}

export function getMediaById(req, res) {
  const { id } = req.params
  const media = db.data.media.find((m) => m.id === id || String(m.tmdbId) === String(id))

  if (!media) {
    return res.status(404).json({ success: false, message: 'Media content not found' })
  }

  // Get similar items sharing at least one genre
  const similar = db.data.media
    .filter((m) => m.id !== media.id && m.genres?.some((g) => media.genres?.includes(g)))
    .slice(0, 6)

  return res.json({
    success: true,
    media,
    similar: similar.length > 0 ? similar : db.data.media.filter((m) => m.id !== media.id).slice(0, 6)
  })
}

export function searchMedia(req, res) {
  const { q } = req.query
  if (!q || !q.trim()) {
    return res.json({ success: true, results: [] })
  }

  const query = q.toLowerCase().trim()
  const results = db.data.media.filter(
    (m) =>
      m.title.toLowerCase().includes(query) ||
      m.description.toLowerCase().includes(query) ||
      m.genres?.some((g) => g.toLowerCase().includes(query)) ||
      m.cast?.some((c) => c.toLowerCase().includes(query))
  )

  return res.json({ success: true, results })
}
