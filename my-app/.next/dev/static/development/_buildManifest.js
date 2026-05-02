self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/feed",
        "destination": "/feed.html"
      },
      {
        "source": "/profile",
        "destination": "/profile.html"
      },
      {
        "source": "/explore",
        "destination": "/explore.html"
      },
      {
        "source": "/trending",
        "destination": "/trending.html"
      },
      {
        "source": "/register",
        "destination": "/register.html"
      },
      {
        "source": "/login",
        "destination": "/login.html"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()