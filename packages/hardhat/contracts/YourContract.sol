pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

  event SetPurpose(address sender, string purpose);
  event Withdraw (address withdrawer, uint256 bal);

  uint256 public askingPrice = 0.00001 ether;
  string public purpose = "I dare you to change this";
  address public owner =  0x7cAb1990de608084D5865aa87EBe4947Cf0A6700;
  constructor() payable {
    // what should we do on deploy?
  }
  function setPurpose(string memory newPurpose) public payable {
      require(msg.value >= askingPrice, "You're Poor!" );
      askingPrice = (askingPrice * 110) / 100;
      purpose = newPurpose;
      emit SetPurpose(msg.sender, purpose);
    
  }


  function withdraw() public  {
      require(msg.sender == owner, "Booo You're a thief" );
      (bool sent, bytes memory data) = msg.sender.call{value: address(this).balance}("");
      require(sent, "Failed to send Ether");
      emit Withdraw(msg.sender, address(this).balance);
  }

  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}
