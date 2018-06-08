import axios from "axios";

const id = "my_id"
const secret = "my_secret";
const params = `?client_id=${id}&client_secret=${secret}`;

const getProfile = (username) => {
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then(function(user) {
      return user.data;
    });
}

const getRepos = (username) => {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

const getStarCount = (repos) => {
  repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
}

const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}

const handleError = (error) => {
  console.warn(error);
  return null;
}

const getUserData = (player) => {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    const profile = data[0];
    const repos = data[1];
    return {
      profile,
      score: calculateScore(profile, repos)
    };
  })
}

const sortPlayers = (players) => {
  players.sort((a, b) => b.score - a.score);
}

export const battle = (players) => {
  return axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);
}

export const fetchPopularRepos = (language) => {
  const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
  return axios.get(encodedURI)
    .then((response) => {
      return response.data.items;
    });
}