const MinimalFoodSupplyChain = artifacts.require("MinimalFoodSupplyChain");

module.exports = function (deployer) {
  deployer.deploy(MinimalFoodSupplyChain);
};
