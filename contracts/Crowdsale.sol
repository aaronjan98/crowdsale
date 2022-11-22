// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import './Token.sol';

contract Crowdsale {
    Token public token;
    uint256 public price;
    uint256 public tokensSold;

    event Buy(uint256 amount, address buyer);

    constructor(Token _token, uint256 _price) {
        token = _token;
        price = _price;
    }

    function buyTokens(uint256 _amount) public payable {
        require(msg.value == (_amount / 1e18) * price);
        require(token.balanceOf(address(this)) >= _amount);
        require(token.transfer(msg.sender, _amount));

        tokensSold += _amount;

        emit Buy(_amount, msg.sender);
    }
}
