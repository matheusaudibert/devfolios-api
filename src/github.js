require("dotenv").config();
const getRepoColor = require("./utils/color");

async function fetchGitHubData(username) {
  const token = process.env.GITHUB_TOKEN;
  try {
    const headers = {
      Authorization: `token ${token}`,
    };

    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      { headers }
    );
    if (!userResponse.ok)
      throw new Error(`Erro ao buscar o usuário: ${userResponse.status}`);
    const userData = await userResponse.json();

    const userName = userData.name || userData.login;

    let reposData = [];
    let page = 1;
    while (true) {
      const reposResponse = await fetch(
        `${userData.repos_url}?page=${page}&per_page=100`,
        { headers }
      );
      if (!reposResponse.ok)
        throw new Error(`Erro ao buscar repositórios: ${reposResponse.status}`);
      const pageRepos = await reposResponse.json();

      if (pageRepos.length === 0) break;
      reposData = reposData.concat(pageRepos);
      page++;
    }

    const originalRepos = reposData.filter((repo) => !repo.fork);

    const repositories = originalRepos.map((repo) => {
      return {
        url: repo.html_url,
        name: repo.name,
        langs: repo.language || "No code",
        desc: repo.description || "",
        color: getRepoColor(repo.language),
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      };
    });

    const topRepos = repositories.sort((a, b) => b.stars - a.stars).slice(0, 4);
    const totalStars = topRepos.reduce((sum, repo) => sum + repo.stars, 0);
    const totalForks = topRepos.reduce((sum, repo) => sum + repo.forks, 0);

    const userInfo = {
      url: userData.html_url,
      name: userName,
      photo: userData.avatar_url,
      username: userData.login,
      location: userData.location || null,
      website: userData.blog || null,
      repositories: userData.public_repos,
      stars: totalStars,
      forks: totalForks,
      followers: userData.followers,
      following: userData.following,
    };

    const finalResponse = {
      data: {
        user: userInfo,
        repositories: topRepos,
      },
    };

    return finalResponse;
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

module.exports = fetchGitHubData;
