// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

const owner = "0x7cAb1990de608084D5865aa87EBe4947Cf0A6700";
const host = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
const cfa = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";
const ETHx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("TestContract", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    log: true,
    waitConfirmations: 5,
  });

  await deploy("TradeableCashflow", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [owner, "PrizeFlow", "PLS", host, cfa, ETHx],
    log: true,
    waitConfirmations: 5,
  });

  // Getting a previously deployed contract
  const TestContract = await ethers.getContract("TestContract", deployer);
  const TradeableCashflow = await ethers.getContract(
    "TradeableCashflow",
    deployer
  );
  // await TestContract.transferOwnership(
  //   0x7cab1990de608084d5865aa87ebe4947cf0a6700
  // );

  /*  await YourContract.setPurpose("Hello");
  
  To take ownership of yourContract using the ownable library uncomment next line and add the 
  // await yourContract.transferOwnership(YOUR_ADDRESS_HERE);
  address you want to be the owner. 
  //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: YourContract.address,
  //       contract: "contracts/YourContract.sol:YourContract",
  //       contractArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["TestContract"];
module.exports.tags = ["PrizeFlow"];
