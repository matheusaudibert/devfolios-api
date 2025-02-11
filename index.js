require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path"); // Adicione esta linha
const fetchGitHubData = require("./src/github");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/index.html"));
});

app.get("/profile/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const data = await fetchGitHubData(username);
    res.json(data);
  } catch (error) {
    res.status(500).send("Erro ao buscar dados do GitHub");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
