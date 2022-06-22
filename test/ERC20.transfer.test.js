const { expect } = require("chai");
const { ethers } = require("hardhat");

// used for rejectedWith. More details here https://www.chaijs.com/plugins/chai-as-promised/
require("chai").use(require('chai-as-promised'));

describe("ERC20.transfer", function () {
  let erc20;
  let erc20Owner;
  let user;

  beforeEach(async () => {
    [erc20Owner, user] = await ethers.getSigners();

    const erc20Factory = await ethers.getContractFactory("ERC20", erc20Owner);
    erc20 = await erc20Factory.deploy("Test", "Test");
    await erc20.deployed();

    await erc20.mint(erc20Owner.address, 1000);
  });

  it("should throw an exception if to address is equal to zero", async function () {
    await expect(erc20.transfer(ethers.constants.AddressZero, 20))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain("ERC20: to address can't be equal to zero");
      })
  });

  it("should throw an exception if account is equal to zero address", async function () {
    await expect(erc20.burn(ethers.constants.AddressZero, 20))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain("ERC20: address can't be equal to zero");
      })
  });

  it("should throw an exception if value is less that address balance", async function () {
    await expect(erc20.burn(user.address, 2000))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain(
            "VM Exception while processing transaction: reverted with panic code 0x11");
      })
  });

  it("should emit a Transfer event", async function () {
    await expect(erc20.transfer(user.address, 100))
        .emit(erc20, "Transfer")
        .withArgs(erc20Owner.address, user.address, 100);
  });

  it("should correctly transfer value from sender to the address", async function () {
    await expect(() => erc20.transfer(user.address, 100))
      .to.changeTokenBalances(erc20, [erc20Owner, user], [-100, 100]);
  });
});
