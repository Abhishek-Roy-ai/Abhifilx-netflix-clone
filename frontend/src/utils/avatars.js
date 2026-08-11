export const KIDS_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="12" fill="%23EAB308"/><circle cx="33" cy="38" r="7" fill="%2318181B"/><circle cx="67" cy="38" r="7" fill="%2318181B"/><path d="M 28 55 Q 50 80 72 55" fill="none" stroke="%2318181B" stroke-width="7" stroke-linecap="round"/></svg>`

export const ADULT_AVATAR = `https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png`

export function getProfileAvatar(profile) {
  if (!profile) return ADULT_AVATAR
  if (profile.isKids || profile.name?.toLowerCase().includes('kids')) {
    return KIDS_AVATAR
  }
  return profile.avatar || ADULT_AVATAR
}
