// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.19;

contract TripContract {

    address public rider;
    address public driver;
    string public pickupLocation;
    string public dropOffLocation;
    uint256 public date;
    uint256 public time;
    uint256 public amount;

    constructor(address _rider, address _driver, string memory _pickupLocation, string memory _dropOffLocation, uint256 _date, uint256 _time, uint256 _amount) {
        rider = _rider;
        driver = _driver;
        pickupLocation = _pickupLocation;
        dropOffLocation = _dropOffLocation;
        date = _date;
        time = _time;
        amount = _amount;
    }

    function getTripDetails() public view returns(address, address, string memory, string memory, uint256, uint256, uint256) {
        return (rider, driver, pickupLocation, dropOffLocation, date, time, amount);
    }

}
