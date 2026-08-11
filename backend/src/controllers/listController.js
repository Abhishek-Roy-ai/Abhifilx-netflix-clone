import { db } from '../config/db.js'

export function getMyList(req, res) {
  const { profileId } = req.query
  if (!profileId) {
    return res.status(400).json({ success: false, message: 'profileId is required' })
  }

  const listItems = db.data.myList.filter((item) => item.profileId === profileId)
  const mediaIds = listItems.map((item) => item.mediaId)
  const mediaObjects = db.data.media.filter((m) => mediaIds.includes(m.id))

  return res.json({ success: true, results: mediaObjects })
}

export function addToMyList(req, res) {
  const { profileId, mediaId } = req.body
  if (!profileId || !mediaId) {
    return res.status(400).json({ success: false, message: 'profileId and mediaId are required' })
  }

  const existing = db.data.myList.find((item) => item.profileId === profileId && item.mediaId === mediaId)
  if (!existing) {
    db.data.myList.push({
      id: `list_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      profileId,
      mediaId,
      addedAt: new Date().toISOString()
    })
    db.save()
  }

  return res.json({ success: true, message: 'Added to My List' })
}

export function removeFromMyList(req, res) {
  const { profileId, mediaId } = req.body
  if (!profileId || !mediaId) {
    return res.status(400).json({ success: false, message: 'profileId and mediaId are required' })
  }

  db.data.myList = db.data.myList.filter((item) => !(item.profileId === profileId && item.mediaId === mediaId))
  db.save()

  return res.json({ success: true, message: 'Removed from My List' })
}
