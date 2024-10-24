// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUsdt is ERC20 {
    address owner;
    constructor(uint256 initialSupply) ERC20("USDT Mock", "USDT") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(uint256 amount) public {
        require(msg.sender == owner, "Only Owner can mint");
        _mint(msg.sender, amount * 10 ** decimals());
    }
}
