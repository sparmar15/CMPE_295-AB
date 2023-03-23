
pragma solidity ^0.8.18;

contract BookRide {

    enum Statuses { Available, Booked }
    Statuses currentStatus;
    address payable public rider;

    event Ride(address _rider, uint _value);

    constructor() public {
        rider = msg.sender;
        currentStatus = Statuses.Available;
    }

    modifier onlyWhileAvailable {
        require(currentStatus == Statuses.Available, "Currently Unavailable.");
        _;
    }

    modifier costs(uint _amount) {
        require(msg.value >= _amount, "Not enough Ether provided.");
        _;
    }

    receive() external payable onlyWhileAvailable costs(2 ether) {
        currentStatus = Statuses.Booked;
        rider.transfer(msg.value);
        emit Ride(msg.sender, msg.value);
    }
}