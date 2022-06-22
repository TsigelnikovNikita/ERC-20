require("dotenv").config();

task("burn", "Allows to destroy amount tokens from account, reducing the total supply.")
    .addParam("account", "Address from which tokens will be burned")
    .addParam("amount", "Amount of tokens that will be burned")
    .setAction(async (taskArgs) => {
        const ContractFactory = await ethers.getContractFactory("ERC20");
        const contract = await ContractFactory.attach(process.env.CONTRACT_ADDRESS);

        await contract.burn(taskArgs.account, taskArgs.amount)
            .then(async () => {
                console.log("Tokens was successfully burned");
            }, (error) => {
                console.log(error.message);
            });
    });
