require("dotenv").config();

task("approve", "Allows `spender` to withdraw from your account multiple times, up to the `value` amount")
    .addParam("spender", "Address to which you approve to withdraw your tokens")
    .addParam("value", "Amount of tokens that spender can withdraw")
    .setAction(async (taskArgs) => {
        const ContractFactory = await ethers.getContractFactory("ERC20");
        const contract = await ContractFactory.attach(process.env.CONTRACT_ADDRESS);

        await contract.approve(taskArgs.spender, taskArgs.value)
            .then(async () => {
                console.log("Approve was successfully done");
            }, (error) => {
                console.log(error.message);
            });
    });
