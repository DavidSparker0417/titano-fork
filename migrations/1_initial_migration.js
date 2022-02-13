const fs = require('fs');
const eris = artifacts.require("ERIS");

module.exports = async function (deployer) {
  await deployer.deploy(eris);

  const erisToken = await eris.deployed();
  fs.writeFileSync('test/migration-info.json', erisToken.address);
};

