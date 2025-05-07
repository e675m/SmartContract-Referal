// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract ReferralProgram is ERC20, Ownable {
    mapping(address => address[]) public referrers;
    mapping(address => uint256) public bonuses;
    mapping(address => bool) public registered;

    AggregatorV3Interface internal priceFeed;

    constructor() ERC20("ReferralToken", "RFT") Ownable(msg.sender) {
        _mint(msg.sender, 10000 * (10 ** decimals())); 
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        registered[msg.sender] = true;
        emit Registered(msg.sender, address(0)); 
    }

    event Registered(address indexed user, address indexed referrer);
    event UpdateBonus(address indexed user, uint256 newBonus);

    function registerSolo() public {
        require(!registered[msg.sender], "Already registered");
        registered[msg.sender] = true;
        emit Registered(msg.sender, address(0));
    }

    function register(address referrer) public {
        require(!registered[msg.sender], "Already registered");
        require(msg.sender != referrer, "Can't refer yourself");
        require(referrer != address(0), "Use registerSolo for solo registration!");

        registered[msg.sender] = true;

        uint256 reward = uint256(getLastPrice() * (10 ** decimals())) / 10**8 / 10;

       referrers[referrer].push(msg.sender);
       bonuses[referrer] += reward;
       _transfer(owner(), referrer, reward);
       emit Registered(msg.sender, referrer);

       bonuses[msg.sender] += reward;
       _transfer(owner(), msg.sender, reward);
       emit UpdateBonus(msg.sender, bonuses[msg.sender]);
    }

    function getLastPrice() public view returns (uint256) {
        (, int256 price , , ,) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price);
    }

    function getReferrers() public view returns (address[] memory) {
        return referrers[msg.sender];
    }

    function getMyBonus() public view returns (uint256) {
        require(registered[msg.sender], "User is not registered");
        return bonuses[msg.sender];
    }

    function getBonus(address user) public view onlyOwner returns (uint256) {
        require(registered[user], "User is not registered"); 
        return bonuses[user];
    }
}
