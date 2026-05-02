const nextConfig = {
  async rewrites() {
    return [
      { source: '/feed', destination: '/feed.html' },
      { source: '/profile', destination: '/profile.html' },
      { source: '/explore', destination: '/explore.html' },
      { source: '/trending', destination: '/trending.html' },
      { source: '/register', destination: '/register.html' },
      { source: '/login', destination: '/login.html' },
    ]
  }
}

export default nextConfig