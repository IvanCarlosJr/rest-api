const express = require('express');
const router = express.Router();

// BUSCA REPOSITORIOS NA API DO GITHUB
async function fetchGithub() {
  const url = 'https://api.github.com/orgs/takenet/repos';
  const params = new URLSearchParams({
    per_page: 5,
    sort: 'created',
    direction: 'asc'
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Erro na requisição dos repositórios: ${response.status}`);
    }
    const repos = await response.json();

    const repoInfo = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      htmlUrl: repo.html_url,
      createdAt: repo.created_at
    }));

    return repoInfo;

  } catch (error) {
    console.error('Erro ao buscar os repositórios:', error);
  }
}

// RETORNA DADOS DOS REPOSITORIOS
router.get('/', async (req, res) => {
  try {

    const repositoryList = await fetchGithub();

    res.status(200).json(repositoryList);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar repositórios', error: error.message });
  }
});

module.exports = router;