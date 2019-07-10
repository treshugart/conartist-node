const fetch = require("node-fetch");
const { getLatestNodeInfo, getVersion, getVersionIsh } = require("./util");

module.exports = {
  files: [
    {
      name: ".nvmrc",
      overwrite: true,
      async data() {
        const info = await getLatestNodeInfo();
        return `v${getVersionIsh(info.version)}`;
      }
    },
    {
      name: "package.json",
      merge: true,
      overwrite: true,
      async data() {
        const info = await getLatestNodeInfo();
        return {
          engines: {
            node: `^${getVersion(info.version)}`,
            npm: `^${getVersion(info.npm)}`
          }
        };
      }
    }
  ]
};
