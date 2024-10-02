

module.exports = {
  

  networks: {
    
    development: {
      host: "127.0.0.1",
      port: 8545, // Ganache GUI default
      network_id: "*",
      gas: 8000000, // Gas limit (match Ganache's block gas limit)
      gasPrice: 20000000000        // Any network (default: none)
    },
    
   
  },

  
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.21", // Match the version you are using in the contract
      // settings: {
      //   optimizer: {
      //     enabled: true, // You can enable the optimizer
      //     runs: 200      // Set the number of runs if you need optimization
      //   },
      // },
    },
  },
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
