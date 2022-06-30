const { expect } = require("chai");
const { ethers } = require("hardhat");

// used for rejectedWith. More details here https://www.chaijs.com/plugins/chai-as-promised/
require("chai").use(require('chai-as-promised'));

describe("ERC20.transferFrom", function () {
  let erc20;
  let erc20Owner;
  let user1;
  let user2;

  beforeEach(async () => {
    [erc20Owner, user1, user2] = await ethers.getSigners();

    const erc20Factory = await ethers.getContractFactory("ERC20", erc20Owner);
    erc20 = await erc20Factory.deploy("Test", "Test");
    await erc20.deployed();

    await erc20.mint(erc20Owner.address, 1000);
    await erc20.approve(user1.address, 500);
  });

  it("should throw an exception if to address is equal to zero", async function () {
    await expect(erc20.connect(user1).transferFrom(erc20Owner.address, ethers.constants.AddressZero, 20))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain("ERC20: to address can't be equal to zero");
      })
  });

  it("should throw an exception if value is less than allowance", async function () {
    await expect(erc20.connect(user1).transferFrom(erc20Owner.address, user2.address, 1000))
      .to.be.rejectedWith(Error)
      .then((error) => {
        expect(error.message).to.contain("ERC20: insufficient allowance");
      })
  });

  it("should emit a Transfer event", async function () {
    await expect(erc20.connect(user1).transferFrom(erc20Owner.address, user2.address, 100))
        .emit(erc20, "Transfer")
        .withArgs(erc20Owner.address, user2.address, 100);
  });

  it("should correctly transfer value from sender to the address", async function () {
    await expect(() => erc20.connect(user1).transferFrom(erc20Owner.address, user2.address, 100))
      .to.changeTokenBalances(erc20, [erc20Owner, user2], [-100, 100]);
  });

  it("should correctly change allowance value", async function () {
    expect(await erc20.allowance(erc20Owner.address, user1.address)).to.eq(500);

    await erc20.connect(user1).transferFrom(erc20Owner.address, user1.address, 100);

    expect(await erc20.allowance(erc20Owner.address, user1.address)).to.eq(400);
  });
});
