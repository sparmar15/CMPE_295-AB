//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.1;

// contract Hello {
//     string public helloworld = "Helloooooo";
// }


contract RideContract {
    event RideConfirmed(address rider);

    function confirmRide() public {
        // Perform some logic to confirm the ride
        emit RideConfirmed(msg.sender);
    }
}
