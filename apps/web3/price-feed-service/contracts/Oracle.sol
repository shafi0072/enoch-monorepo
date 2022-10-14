//SPDX-License-Identifier: MIT
pragma solidity =0.8.12;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * Contract: Price Feed Oracle
 * Author: Element Zero Labs
 */
contract Oracle is Initializable {
    event PriceUpdated(uint8 indexed priceIndex, uint256 price);
    event PriceRequested(address indexed oracle, uint8 indexed priceIndex);
    event NodeUpdated(address indexed node);

    // Stores the address of node, which will call the priceUpdate
    address private node;
    // Stores the current index of the price mapping
    uint8 public priceIndex;
    // Stores the price by crypto index;
    /**
     * TODO Add comment about index number and corresponding crypto.
     */
    mapping(uint8 => uint256) public prices;

    modifier onlyNode() {
        require(msg.sender == node, "Oracle: Invalid caller");
        _;
    }

    /**
     * @notice Initializes the contract
     *
     * @param _prices Prices for all the available crypto in system
     */
    function initialize(uint256[] calldata _prices) external initializer {
        uint8 currentIndex = priceIndex;
        uint256 priceLength = _prices.length;
        for (uint8 index = 0; index < priceLength; index ++) {
            prices[currentIndex] = _prices[index];
            currentIndex++;
        }
        priceIndex = currentIndex;
        node = msg.sender;
    }

    /**
     * @notice Used to request the price update
     *
     * @param _priceIndex Index of the crypto of which the price needs to update
     */
    function requestPriceUpdate(uint8 _priceIndex) external {
        emit PriceRequested(address(this), _priceIndex);
    }

    /**
     * @notice Used to update the node address
     * @param _node Address of te new node
     */
    function updateNode(address _node) external onlyNode {
        emit NodeUpdated(_node);
        node = _node;
    }

    /**
     * @notice Used to update the price according to index
     */
    function priceUpdate(uint8 _priceIndex, uint256 _price) external onlyNode {
        emit PriceUpdated(_priceIndex, _price);
        prices[_priceIndex] = _price;
    }
}
