// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ReferralProgram is ERC20, Ownable {
    mapping(address => bool) public registered;
    mapping(address => uint256) public referralActions;

    AggregatorV3Interface internal priceFeed;
    address public oracle;

    constructor() ERC20("ReferralToken", "RFT") Ownable(msg.sender) {
        _mint(msg.sender, 70000 * 10 ** decimals());
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        registered[msg.sender] = true;
        oracle = msg.sender;
        emit Registered(msg.sender);
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Caller is not the oracle");
        _;
    }

    event Registered(address indexed user);
    event ReferralAction(address indexed user, uint256 totalActions);

    function registerSolo() public {
        require(!registered[msg.sender], "Already registered");
        registered[msg.sender] = true;
        emit Registered(msg.sender);
    }

    function awardBonus(address to) public onlyOracle {
        require(registered[to], "User not registered");

        uint256 ethPrice = getLastPrice();
        uint256 bonusUSD = ethPrice / 10;
        uint256 bonusTokens = bonusUSD * 10 ** decimals() / 10 ** 8;

        require(balanceOf(owner()) >= bonusTokens, "Not enough tokens in the contract");

        _transfer(owner(), to, bonusTokens);

        referralActions[to] += 1;
        emit ReferralAction(to, referralActions[to]);
    }

    function getLastPrice() public view returns (uint256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price);
    }

    function setOracle(address _oracle) public onlyOwner {
        require(_oracle != address(0), "Invalid oracle address");
        oracle = _oracle;
    }

    function getReferralActions(address user) public view returns (uint256) {
        return referralActions[user];
    }
}
