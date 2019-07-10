const execa = require("execa");
const fetch = require("node-fetch");
const getNpmUser = require("npm-user");

async function getEmail() {
  return (await getNpmUser(await getWhoami())).email;
}

async function getWhoami() {
  return (await execa("npm", ["whoami"])).stdout;
}

async function getLatestNodeInfo() {
  const resp = await fetch("https://nodejs.org/dist/index.json");
  const json = await resp.json();
  return json[0];
}

function getVersion(ver) {
  return ver.replace("v", "");
}

function getVersionIsh(ver) {
  return getVersion(ver.split(".")[0]);
}

module.exports = {
  getEmail,
  getLatestNodeInfo,
  getVersion,
  getVersionIsh,
  getWhoami
};
