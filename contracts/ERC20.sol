//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ERC20 {
    mapping (address => uint256) _balances;
    mapping (address => mapping(address => uint256)) allowances;

    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function decimals() public pure virtual returns(uint8) {
        return 18;
    }

    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    function allowance(address _owner, address _spender) public view virtual returns (uint256 remaining) {
        return allowances[_owner][_spender];
    }

    function balanceOf(address _owner) public view virtual returns (uint256 balance) {
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public view virtual returns (bool success) {
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public virtual returns (bool success) {
        return true;
    }

    function approve(address _spender, uint256 _value) public virtual returns (bool success) {
        return true;
    }
}
