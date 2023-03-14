
require("dotenv").config();
const { MNEMONIC, INFURA_ID, ALCHEMY_ID } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {

  contracts_build_directory: "../client/src/contracts",
  networks: {
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     goerli: {
      provider: () =>
        new HDWalletProvider(MNEMONIC,`https://goerli.infura.io/v3/${INFURA_ID}`),
      network_id: 5, // Goerli's id
      confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
      etworkCheckTimeout: 10000,
      //timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      //skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(MNEMONIC,`https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID}`),
      network_id: 80001,
      production: true,
    },
    
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },


};
  