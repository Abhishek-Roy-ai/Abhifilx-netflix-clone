import { db } from '../config/db.js'

const AVATARS = [
  'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
  'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88oswywww714a2du.jpg',
  'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-2v7z1ch30eb11w58.jpg',
  'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-w58wwb4ch2pffspq.jpg'
]

export function getProfiles(req, res) {
  const profiles = db.data.profiles.filter((p) => p.userId === req.user.id)
  return res.json({ success: true, profiles })
}

export function createProfile(req, res) {
  const { name, avatar, isKids } = req.body
  const existingProfiles = db.data.profiles.filter((p) => p.userId === req.user.id)

  if (existingProfiles.length >= 5) {
    return res.status(400).json({ success: false, message: 'Maximum limit of 5 profiles reached' })
  }

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Profile name is required' })
  }

  const newProfile = {
    id: `prof_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    userId: req.user.id,
    name: name.trim(),
    avatar: avatar || AVATARS[existingProfiles.length % AVATARS.length],
    isKids: Boolean(isKids),
    createdAt: new Date().toISOString()
  }

  db.data.profiles.push(newProfile)
  db.save()

  return res.status(201).json({ success: true, profile: newProfile })
}

export function updateProfile(req, res) {
  const { profileId } = req.params
  const { name, avatar, isKids } = req.body

  const profile = db.data.profiles.find((p) => p.id === profileId && p.userId === req.user.id)
  if (!profile) {
    return res.status(404).json({ success: false, message: 'Profile not found' })
  }

  if (name !== undefined) profile.name = name.trim()
  if (avatar !== undefined) profile.avatar = avatar
  if (isKids !== undefined) profile.isKids = Boolean(isKids)

  db.save()
  return res.json({ success: true, profile })
}

export function deleteProfile(req, res) {
  const { profileId } = req.params
  const profiles = db.data.profiles.filter((p) => p.userId === req.user.id)

  if (profiles.length <= 1) {
    return res.status(400).json({ success: false, message: 'Account must have at least one profile' })
  }

  db.data.profiles = db.data.profiles.filter((p) => !(p.id === profileId && p.userId === req.user.id))
  // also clean up myList and watchHistory for this profile
  db.data.myList = db.data.myList.filter((item) => item.profileId !== profileId)
  db.data.watchHistory = db.data.watchHistory.filter((item) => item.profileId !== profileId)

  db.save()
  return res.json({ success: true, message: 'Profile deleted successfully' })
}
