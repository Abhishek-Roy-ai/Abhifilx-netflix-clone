const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export function imageUrl(path, size = 'w500') {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

