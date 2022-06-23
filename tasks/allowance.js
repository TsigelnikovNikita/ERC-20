require("dotenv").config();

task("allowance", "Allows to get amount which `spender` is still allowed to withdraw from `owner`")
    .addParam("spender", "Address who can withdraw")
    .addParam("owner", "Address from wich banalce can withdraw")
    .setAction(async (taskArgs) => {
        const ContractFactory = await ethers.getContractFactory("ERC20");
        const contract = await ContractFactory.attach(process.env.CONTRACT_ADDRESS);

        await contract.allowance(taskArgs.owner, taskArgs.spender)
            .then(async (result) => {
                console.log(`Allowance for ${taskArgs.spender} from ${taskArgs.owner}: ${result}`);
            }, (error) => {
                console.log(error.reason);
            });
    });
