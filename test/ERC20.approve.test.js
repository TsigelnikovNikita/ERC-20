const { expect } = require("chai");
const { ethers } = require("hardhat");

// used for rejectedWith. More details here https://www.chaijs.com/plugins/chai-as-promised/
require("chai").use(require('chai-as-promised'));

describe("ERC20.approve", function () {
  let erc20;
  let erc20Owner;
  let user;

  beforeEach(async () => {
    [erc20Owner, user] = await ethers.getSigners();

    const erc20Factory = await ethers.getContractFactory("ERC20", erc20Owner);
    erc20 = await erc20Factory.deploy("Test", "Test");
    await erc20.deployed();
  });

  it("should approve amount of token correctly", async function () {
    await erc20.approve(user.address, 1000);

    expect(await erc20.allowance(erc20Owner.address, user.address)).to.eq(1000);
  });

  it("should emit an Approval event", async function () {
    await expect(erc20.approve(user.address, 1000))
        .emit(erc20, "Approval")
        .withArgs(erc20Owner.address, user.address, 1000);
  });
});
