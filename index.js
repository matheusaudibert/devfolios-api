require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const fetchGitHubData = require("./src/github");

app.use(express.static(path.join(__dirname, "public")));
app.use("/styles", express.static(path.join(__dirname, "public/styles")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/index.html"));
});

app.get("/profile/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const data = await fetchGitHubData(username);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
