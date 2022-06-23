//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20 {
    mapping (address => uint256) _balances;
    mapping (address => mapping(address => uint256)) allowances;

    address immutable public owner;

    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    modifier onlyOwner {
        require(msg.sender == owner, "ERC20: only owner can call this function");
        _;
    }

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender;
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

    function transfer(address _to, uint256 _value) public virtual returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public virtual returns (bool success) {
        allowances[_from][_to] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public virtual returns (bool success) {
        allowances[msg.sender][_spender] = _value;
        return true;
    }

    function _transfer(address _from, address _to, uint256 _value) internal virtual {
        require(_from != address(0x0), "ERC20: from address can't be equal to zero");
        require(_to != address(0x0), "ERC20: to address can't be equal to zero");

        _balances[_from] -= _value;
        _balances[_to] += _value;

        emit Transfer(_from, _to, _value);
    }

    function mint(address account, uint256 amount) public virtual onlyOwner {
        require(account != address(0x0), "ERC20: address can't be equal to zero");
        _totalSupply += amount;
        _balances[account] += amount;
    }

    function burn(address account, uint256 amount) public virtual onlyOwner {
        require(account != address(0x0), "ERC20: address can't be equal to zero");
        _totalSupply -= amount;
        _balances[account] -= amount;            
    }
}
