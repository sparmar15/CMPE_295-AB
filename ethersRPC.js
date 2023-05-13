import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import {Buffer} from 'buffer';
import {login} from './Utils/web3Auth';
import axios from 'axios';
global.Buffer = global.Buffer || Buffer;

const providerUrl = 'HTTP://127.0.0.1:7545'; // Or your desired provider url

const getChainId = async () => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails;
  } catch (error) {
    return error;
  }
};

const getETHVal = async value => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    );

    const ethPrice = response.data.ethereum.usd;

    const ethAmount = value / ethPrice;
    const formattedAmount = parseFloat(ethAmount).toFixed(2);
    return formattedAmount;
  } catch (error) {
    console.error(error);
  }
};

const getAccounts = async key => {
  try {
    const wallet = new ethers.Wallet(key);
    const address = await wallet.address;
    return address;
  } catch (error) {
    return error;
  }
};

const getBalance = async key => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const balance = await wallet.getBalance();
    const netBalance = ethers.utils.formatEther(balance);
    const formattedAmount = parseFloat(netBalance).toFixed(2);
    return formattedAmount;
  } catch (error) {
    return error;
  }
};

const sendTransaction = async key => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const signer = wallet.connect(ethersProvider);
    const destination = '0x516d06E065dAF98Deee5a5411aC4755fAB855634';
    const gasPrice = ethersProvider.getGasPrice();
    const tx = {
      from: wallet.address,
      to: destination,
      value: ethers.utils.parseUnits('0.01', 'ether'),
      gasPrice: gasPrice,
      // gasLimit: ethers.utils.hexValue(),
      nonce: ethersProvider.getTransactionCount(wallet.address, 'latest'),
    };

    const transaction = await signer.sendTransaction(tx);
    console.log(transaction.hash);

    return transaction.hash;
  } catch (error) {
    return error;
  }
};

const signMessage = async key => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    const originalMessage = 'YOUR_MESSAGE';

    // Sign the message
    const signedMessage = await wallet.signMessage(originalMessage);

    return signedMessage;
  } catch (error) {
    return error;
  }
};

export default {
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
  getETHVal,
};
