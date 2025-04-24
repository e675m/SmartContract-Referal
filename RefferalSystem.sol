// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReferralProgram {
    mapping(address => address[]) public referrers;
    mapping(address => uint256) public bonuses;
    mapping(address => bool) public registered;

    event Registered(address indexed user, address referrer);

    function register(address referrer) public {
        require(!registered[msg.sender], "Already registered");
        require(msg.sender != referrer, "Can't refer yourself");

        registered[msg.sender] = true;
        
        if (referrer != address(0)) {
            referrers[referrer].push(msg.sender);
            bonuses[referrer] += 100;
            emit Registered(msg.sender, referrer); // Отправим событие
        }

        bonuses[msg.sender] += 100;
        emit Registered(msg.sender, address(0)); // Событие для самого пользователя
    }

    function getReferrers() public view returns (address[] memory) {
        return referrers[msg.sender];
    }

    function getBonus(address user) public view returns (uint256) {
    require(registered[user], "User is not registered");
    return bonuses[user];
    }

}