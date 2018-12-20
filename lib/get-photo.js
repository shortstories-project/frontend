function getPhoto(url) {
  if (typeof url === 'string') return url
  return '/static/user-placeholder.png'
}

export default getPhoto
