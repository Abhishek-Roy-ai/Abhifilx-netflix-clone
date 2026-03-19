import axios from 'axios'

const baseURL = import.meta.env.VITE_TMDB_BASE_URL
const apiKey = import.meta.env.VITE_TMDB_API_KEY

export const tmdbClient = axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
  },
  params: {
    api_key: apiKey,
  },
})

