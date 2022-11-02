pragma solidity >=0.4.22 <0.9.0;

contract PeerToPeer {
    struct Rider {
        uint256 id;
        string name;
        string e_mail;
        uint256 number;
    }

    struct Driver {
        address driver;
        string name;
        string e_mail;
        uint256 number;
    }
    mapping(address => Rider) public rider;
    mapping(uint256 => Driver) public driver;

    function sqrt(uint256 x) private pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function isPickUpFeasible(
        uint256[] memory _driver_pickup,
        uint256[] memory _rider_pickup
    ) private pure returns (bool) {
        uint256 temp = (_driver_pickup[0] - _rider_pickup[0]) *
            (_driver_pickup[0] - _rider_pickup[0]) +
            (_driver_pickup[1] - _rider_pickup[1]) *
            (_driver_pickup[1] - _rider_pickup[1]);
        uint256 dist = sqrt(temp);
        if (dist <= 5) {
            return true;
        }
        return false;
    }

    function bookRide(
        uint256[] memory _driver_pickup_location,
        uint256[] memory _driver_drop_location,
        uint256[] memory _rider_drop_location,
        uint256[] memory _rider_pickup_location
    ) public pure returns (bool) {
        bool isValid = isPickUpFeasible(
            _driver_pickup_location,
            _rider_pickup_location
        );

        if (
            isValid &&
            _rider_drop_location[0] == _driver_drop_location[0] &&
            _rider_drop_location[1] == _driver_drop_location[1]
        ) {
            return true;
        }
        return false;
    }
}
