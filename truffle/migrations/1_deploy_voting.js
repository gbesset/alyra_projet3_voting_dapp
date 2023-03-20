const Voting = artifacts.require("Voting");

module.exports = async function (deployer) {
  await deployer.deploy(Voting);

  /* Script pour goerli
  const instance = await Voting.deployed();
  const ownerAddress = "0xA1b9576F5Ecd6522B461399597f81653B5eB763e";

  let tx = await instance.addVoter(ownerAddress, { from: ownerAddress });
  console.log(`Owner added as voter`);
*/
};
