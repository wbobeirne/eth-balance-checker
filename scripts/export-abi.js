const { readdir, access, constants, mkdir, writeFile } = require("fs");
const { resolve, join } = require("path");
const { promisify } = require("util");
const ROOT_DIR = `${__dirname}/..`;
const ABI_DIR = resolve(ROOT_DIR, "abis");

async function getAbis() {
  const readdirAsync = promisify(readdir);
  const CONTRACTS_DIR = resolve(ROOT_DIR, "build/contracts");
  const fileNames = await readdirAsync(CONTRACTS_DIR);
  for (const file of fileNames) {
    const jsonAbi = require(join(CONTRACTS_DIR, file));
    await writeAbiToFile(jsonAbi);
  }
}

function fileExists(file) {
  const accessAsync = promisify(access);
  return accessAsync(file, constants.F_OK)
    .then(() => true)
    .catch(e => false);
}

async function writeAbiToFile({ abi, contractName }) {
  const mkdirAsync = promisify(mkdir);
  const writeFileAsync = promisify(writeFile);
  if (!(await fileExists(ABI_DIR))) {
    await mkdirAsync(ABI_DIR);
  }
  writeFileAsync(
    resolve(ABI_DIR, `${contractName}.abi.json`),
    JSON.stringify(abi, null, 1)
  );
}

module.exports = getAbis();
