const getFullname = require("fullname");
const path = require("path");
const {
  getEmail,
  getLatestNodeInfo,
  getVersion,
  getVersionIsh,
  getWhoami
} = require("./util");

module.exports = async ({ cwd }) => {
  const date = new Date();
  const email = (await getEmail()) || "";
  const fullname = (await getFullname()) || "";
  const nodeInfo = await getLatestNodeInfo();
  return {
    files: [
      {
        name: ".gitignore",
        data: `
          *.log*
          .DS_Store
          node_modules
        `
      },
      {
        name: ".nvmrc",
        data: `v${getVersionIsh(nodeInfo.version)}`
      },
      {
        name: "package.json",
        merge: true,
        sort: true,
        data: {
          author: fullname + (email ? ` <${email}>` : ""),
          devDependencies: {
            np: "*"
          },
          engines: {
            node: `^${getVersion(nodeInfo.version)}`,
            npm: `^${getVersion(nodeInfo.npm)}`
          },
          name: path.basename(cwd),
          version: "0.0.0"
        }
      },
      {
        name: "LICENSE",
        type: "md",
        data: () => {
          const pkg = require(path.resolve(cwd, "package.json"));
          return `
              MIT License

              Copyright (c) ${date.getFullYear()} ${pkg.author}
              
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
              
              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.
              
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            `;
        }
      },
      {
        name: "README.md",
        data: () => {
          const pkg = require(path.resolve(cwd, "package.json"));
          return `
              # ${pkg.name}

              > ${pkg.description}
            `;
        }
      }
    ]
  };
};
