// SPDX-License-Identifier: MIT
pragma solidity >=0.4.17 <0.9.0;

contract MinimalFoodSupplyChain {
    struct FoodItem {
        uint id;
        string name;
        address owner;
    }

    mapping(uint => FoodItem) public foodItems;
    uint public foodItemCount;

    // Example function to add food item
    function addFoodItem(string memory _name) public {
        foodItemCount++;
        foodItems[foodItemCount] = FoodItem(foodItemCount, _name, msg.sender);
    }
}
