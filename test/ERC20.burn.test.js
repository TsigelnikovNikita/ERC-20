const { expect } = require("chai");
const { ethers } = require("hardhat");

// used for rejectedWith. More details here https://www.chaijs.com/plugins/chai-as-promised/
require("chai").use(require('chai-as-promised'));

describe("ERC20.burn", function () {
  let erc20;
  let erc20Owner;
  let user;

  beforeEach(async () => {
    [erc20Owner, user] = await ethers.getSigners();

    const erc20Factory = await ethers.getContractFactory("ERC20", erc20Owner);
    erc20 = await erc20Factory.deploy("Test", "Test");
    await erc20.deployed();

    await erc20.mint(user.address, 1000);
  });

  it("should throw an exception if caller is not owner", async function () {
    await expect(erc20.connect(user).burn(user.address, 20))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain("ERC20: only owner can call this function");
      })
  });

  it("should throw an exception if account is equal to zero address", async function () {
    await expect(erc20.burn(ethers.constants.AddressZero, 20))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain("ERC20: address can't be equal to zero");
      })
  });

  it("should throw an exception if amount is less than address balance", async function () {
    await expect(erc20.burn(user.address, 2000))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain(
            "VM Exception while processing transaction: reverted with panic code 0x11");
      })
  });

  it("should correctly remove amount from the address balance", async function () {
    await expect(() => erc20.burn(user.address, 50))
        .to.changeTokenBalance(erc20, user, -50);
  });

  it("should correctly decrease totalSupply", async function () {
    expect(await erc20.totalSupply()).to.eq(1000);

    await erc20.burn(user.address, 1000);

    expect(await erc20.totalSupply()).to.eq(0);
  });
});
