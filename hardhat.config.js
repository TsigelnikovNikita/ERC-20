require("@nomiclabs/hardhat-waffle");
require("hardhat-dependency-compiler");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-storage-layout");

require("dotenv").config();
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

require("./tasks/allowance");
require("./tasks/approve");
require("./tasks/balanceOf");
require("./tasks/burn");
require("./tasks/mint");
require("./tasks/transfer");
require("./tasks/transferFrom");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: (process.env.COMPILE_VERSION) ? process.env.COMPILE_VERSION : "0.8.4",
    settings: {
      optimizer: {
        enabled: (process.env.OPTIMIZER == "true") ? true : false,
        runs: (process.env.OPTIMIZER_RUNS) ? process.env.OPTIMIZER_RUNS : 200,
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS == "true") ? true : false
  },
  defaultNetwork: (process.env.DEFAULT_NETWORK) ? process.env.DEFAULT_NETWORK : "hardhat",
  networks: {
    rinkeby: {
      url: `${process.env.RINKEBY_NETWORK_URI}`,
      accounts: [`${process.env.SIGNER_PRIVATE_KEY}`]
    },
  }
};

// for case when user didn't define SIGNER_PRIVATE_KEY and RINKEBY_NETWORK_URI variables  
if (process.env.SIGNER_PRIVATE_KEY == undefined ||
    process.env.RINKEBY_NETWORK_URI == undefined) {
  delete module.exports.networks.rinkeby
}
