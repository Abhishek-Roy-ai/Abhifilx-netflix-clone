import { tmdbClient } from './tmdbClient'

async function get(path, params) {
  const res = await tmdbClient.get(path, { params })
  return res.data
}

export const tmdb = {
  getTrending({ language = 'en-US' } = {}) {
    return get('/trending/all/week', { language })
  },
  getMovieDetails(movieId, { language = 'en-US' } = {}) {
    return get(`/movie/${movieId}`, { language, append_to_response: 'videos,credits' })
  },
}

