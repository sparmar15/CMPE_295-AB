// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.19;


contract Payment {
    address payable public driver;
    address payable public rider;
    uint public amount;
    uint public balance;

    constructor(){
        
    }

    // constructor(address payable _driver, address payable _rider, uint _amount) {
    //     driver = _driver;
    //     rider = _rider;
    //     amount = _amount;
    //     balance = _amount;
    // }

    function confirmPayment() public payable {
        require(msg.sender == rider, "Only rider can confirm payment.");
        require(msg.value == amount, "Payment amount is incorrect.");
        balance -= msg.value;
        driver.transfer(msg.value);
    }

    function refundPayment() public {
        require(msg.sender == driver, "Only driver can initiate refund.");
        rider.transfer(balance);
        balance = 0;
    }
}
