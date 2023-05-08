require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
require('@nomicfoundation/hardhat-toolbox');
// require('dotenv').config();

module.exports = {
  solidity: '0.8.1',
  networks: {
    localganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: [
        '0x171c96507352fe681cd3d70f85299c9b7da2d2e7ec9d9e0191d0e90479e07e94',
      ],
    },
  },
};
