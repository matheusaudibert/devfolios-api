const languages = require("linguist-languages");

const colors = Object.fromEntries(
  Object.entries(languages)
    .filter(([, { color }]) => color)
    .map(([name, { color }]) => [name, color])
);

function getRepoColor(language) {
  if (!language) {
    return "#ffffff";
  }

  return colors[language] || "#ffffff";
}

module.exports = getRepoColor;
