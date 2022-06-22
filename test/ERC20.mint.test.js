const { expect } = require("chai");
const { ethers } = require("hardhat");

// used for rejectedWith. More details here https://www.chaijs.com/plugins/chai-as-promised/
require("chai").use(require('chai-as-promised'));

describe("ERC20.mint", function () {
  let erc20;
  let erc20Owner;
  let user;

  beforeEach(async () => {
    [erc20Owner, user] = await ethers.getSigners();

    const erc20Factory = await ethers.getContractFactory("ERC20", erc20Owner);
    erc20 = await erc20Factory.deploy("Test", "Test");
    await erc20.deployed();
  });

  it("should throw an exception if caller is not owner", async function () {
    await expect(erc20.connect(user).mint(user.address, 20))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain("ERC20: only owner can call this function");
      })
  });

  it("should throw an exception if account is equal to zero address", async function () {
    await expect(erc20.mint(ethers.constants.AddressZero, 20))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain("ERC20: address can't be equal to zero");
      })
  });

  it("should correctly add amount to the address balance", async function () {
    await expect(() => erc20.mint(user.address, 100))
      .to.changeTokenBalance(erc20, user, 100);
  });

  it("should correctly increase totalSupply", async function () {
    expect(await erc20.totalSupply()).to.eq(0);

    await erc20.mint(user.address, 100);

    expect(await erc20.totalSupply()).to.eq(100);
  });
});
