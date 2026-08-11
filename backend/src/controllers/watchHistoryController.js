import { db } from '../config/db.js'

export function getContinueWatching(req, res) {
  const { profileId } = req.query
  if (!profileId) {
    return res.status(400).json({ success: false, message: 'profileId is required' })
  }

  const history = db.data.watchHistory
    .filter((h) => h.profileId === profileId)
    .sort((a, b) => new Date(b.lastWatchedAt) - new Date(a.lastWatchedAt))

  const results = history
    .map((h) => {
      const media = db.data.media.find((m) => m.id === h.mediaId)
      if (!media) return null
      return {
        ...media,
        watchProgress: {
          progressSeconds: h.progressSeconds,
          totalSeconds: h.totalSeconds,
          percentage: Math.min(Math.round((h.progressSeconds / (h.totalSeconds || 1)) * 100), 100),
          lastWatchedAt: h.lastWatchedAt
        }
      }
    })
    .filter(Boolean)

  return res.json({ success: true, results })
}

export function updateProgress(req, res) {
  const { profileId, mediaId, progressSeconds, totalSeconds } = req.body

  if (!profileId || !mediaId) {
    return res.status(400).json({ success: false, message: 'profileId and mediaId are required' })
  }

  let record = db.data.watchHistory.find((h) => h.profileId === profileId && h.mediaId === mediaId)

  if (record) {
    record.progressSeconds = Number(progressSeconds) || 0
    record.totalSeconds = Number(totalSeconds) || record.totalSeconds || 100
    record.lastWatchedAt = new Date().toISOString()
  } else {
    record = {
      id: `wh_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      profileId,
      mediaId,
      progressSeconds: Number(progressSeconds) || 0,
      totalSeconds: Number(totalSeconds) || 100,
      lastWatchedAt: new Date().toISOString()
    }
    db.data.watchHistory.push(record)
  }

  db.save()
  return res.json({ success: true, record })
}
