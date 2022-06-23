require("dotenv").config();

task("balanceOf", "Allows to get an address balance with address `owner`")
    .addParam("owner", "Address whose balance we want to get")
    .setAction(async (taskArgs) => {
        const ContractFactory = await ethers.getContractFactory("ERC20");
        const contract = await ContractFactory.attach(process.env.CONTRACT_ADDRESS);

        await contract.balanceOf(taskArgs.owner)
            .then(async (result) => {
                console.log(`Account balance: ${result}`);
            }, (error) => {
                console.log(error.reason);
            });
    });
