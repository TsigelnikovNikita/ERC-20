require("dotenv").config();

task("transferFrom", "Allows to transfer tokens from address `from` to address `to`")
    .addParam("from", "Address from which tokens will be transfered")
    .addParam("to", "Address to which tokens will be transfered")
    .addParam("value", "Amount of tokens that will be transfered")
    .setAction(async (taskArgs) => {
        const ContractFactory = await ethers.getContractFactory("ERC20");
        const contract = await ContractFactory.attach(process.env.CONTRACT_ADDRESS);

        await contract.transferFrom(taskArgs.from, taskArgs.to, taskArgs.value)
            .then(async () => {
                console.log("Tokens was successfully transfered");
            }, (error) => {
                console.log(error.reason);
            });
    });
