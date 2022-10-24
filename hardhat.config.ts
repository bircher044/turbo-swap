import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy-ethers";
import * as dotenv from 'dotenv';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';

dotenv.config();

export default {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
      },
      {
        version: "0.6.6",
        settings: {},
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: process.env.PRIVATE_KEY,
      chainId: 5
    },
    localhost: {
      chainId: 1337
    }
  }
};