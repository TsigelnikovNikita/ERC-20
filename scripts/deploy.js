const hre = require("hardhat");

const CONTRACT_NAME="ERC20";
const TOKEN_NAME="CryptonStudio";
const SYMBOL_NAME="CRS";

async function main() {
    const contractFactory = await hre.ethers.getContractFactory(CONTRACT_NAME);

    const contract = await contractFactory.deploy(TOKEN_NAME, SYMBOL_NAME);
    console.log(`Transaction hash: ${contract.deployTransaction.hash}`);
    await contract.deployed();
    console.log(`${CONTRACT_NAME} deployed to: ${contract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
