let PeerToPeer = artifacts.require("./PeerToPeer.sol");

module.exports = function(deployer) {
  deployer.deploy(PeerToPeer);
};