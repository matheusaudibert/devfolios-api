# 😼 Expose your Github data through a RESTful API

Devfolios API allows you to easily retrieve detailed GitHub profile information through a simple endpoint (`https://api.devfolios.xyz/user/:your_username`). It provides essential data such as profile picture, username, repositories, stars, followers, and the 4 most popular repositories. This is ideal for showcasing GitHub stats, personal portfolios, or integrating user profiles into your app or website.

No need to deploy anything yourself – just make requests to the API endpoint. If you prefer, you can self-host the API with minimal setup.

Whether you're building a portfolio, a GitHub stats dashboard, or integrating profiles into your app, Devfolios API makes it easy to display relevant GitHub data in a stylish, customizable way.

## API Docs

#### Getting a user's data

`GET https://api.devfolios.xyz/user/matheusaudibert`

Example response:

```js
{
  "data": {
    "user": {
      "url": "https://github.com/matheusaudibert",
      "name": "Matheus Audibert",
      "photo": "https://avatars.githubusercontent.com/u/85813476?v=4",
      "username": "matheusaudibert",
      "location": "São Paulo",
      "website": null,
      "repositories": 14,
      "stars": 137,
      "forks": 5,
      "followers": 49,
      "following": 44
    },
    "repositories": [
      {
        "name": "devspace",
        "langs": "JavaScript",
        "desc": "🌌 DEVSPACE, seu portal para o universo da programação!",
        "color": "#f1e05a",
        "stars": 115,
        "forks": 1
      },
      {
        "name": "resume-ai",
        "langs": "Python",
        "desc": "Resumos inteligentes e instantâneos! ✏️",
        "color": "#3572A5",
        "stars": 14,
        "forks": 4
      },
      {
        "name": "discraper",
        "langs": "JavaScript",
        "desc": "🐷 A simply discord badge scraper web page! 100% Functionally.",
        "color": "#f1e05a",
        "stars": 6,
        "forks": 0
      },
      {
        "name": "audibert",
        "langs": "JavaScript",
        "desc": "👨‍💻 Effortlessly access all your Discord data through a powerful API with just one click.",
        "color": "#f1e05a",
        "stars": 2,
        "forks": 0
      }
    ]
  }
}
```
