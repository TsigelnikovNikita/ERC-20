require("dotenv").config();

task("mint", "Allows to mint tokens and assigns them to account, increasing the total supply.")
    .addParam("account", "Address for which tokens will be minted")
    .addParam("amount", "Amount of tokens that will be minted")
    .setAction(async (taskArgs) => {
        const ContractFactory = await ethers.getContractFactory("ERC20");
        const contract = await ContractFactory.attach(process.env.CONTRACT_ADDRESS);

        await contract.mint(taskArgs.account, taskArgs.amount)
            .then(async () => {
                console.log("Tokens was successfully minted");
            }, (error) => {
                console.log(error.message);
            });
    });
