const { expect } = require("chai");
const { ethers } = require("hardhat");

// used for rejectedWith. More details here https://www.chaijs.com/plugins/chai-as-promised/
require("chai").use(require('chai-as-promised'));

describe("ERC20.basic", function () {
  let erc20Owner;
  let user;

  it("should deploy with correct values", async function () {
    [erc20Owner, user] = await ethers.getSigners();
    const erc20Factory = await ethers.getContractFactory("ERC20", erc20Owner);
    const erc20 = await erc20Factory.deploy("TestName", "TestSymbol");
    await erc20.deployed();

    expect(await erc20.name()).to.eq("TestName");
    expect(await erc20.symbol()).to.eq("TestSymbol");
    expect(await erc20.decimals()).to.eq(18);
    expect(await erc20.totalSupply()).to.eq(0);
    expect(await erc20.owner()).to.eq(erc20Owner.address);
  });
});
