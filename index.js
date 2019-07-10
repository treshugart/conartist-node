#! /usr/bin/env node

const commands = {
  node: "Generates a basic node project.",
  "update-node": "Updates the NodeJS version in your project."
};

module.exports = require("conartist").bin({
  ...require("./package.json"),
  commands,
  conartist: ({ cmd }) => require(`./commands/${cmd}`)
});
