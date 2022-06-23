const hre = require("hardhat");

const CONTRACT_NAME="ERC20";
const TOKEN_NAME="name";
const SYMBOL_NAME="symbol";

async function main() {
    const contractFactory = await hre.ethers.getContractFactory(CONTRACT_NAME);

    const contract = await contractFactory.deploy(TOKEN_NAME, SYMBOL_NAME);
    await contract.deployed();
    console.log(`${CONTRACT_NAME} deployed to: ${contract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
