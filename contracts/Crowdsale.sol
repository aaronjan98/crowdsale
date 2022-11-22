// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import './Token.sol';

contract Crowdsale {
    Token public token;

    constructor(Token _token) {
        token = _token;
    }

    function buyTokens(uint256 _amount) public {
        token.transfer(msg.sender, _amount);
    }
}
