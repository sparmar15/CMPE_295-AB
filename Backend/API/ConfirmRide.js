import {ethers} from 'ethers';
import contractABI from './ContractABI.js';
export const confirmRide = async (contractAddress, privateKey) => {
  // Connect to the Ethereum network using the private key
  const provider = new ethers.providers.JsonRpcProvider(
    'HTTP://127.0.0.1:7545',
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get the contract instance
  const abi = contractABI;
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // Call the confirmRide function on the contract and get the transaction hash
  const tx = await contract.confirmRide();
  const txHash = tx.hash;

  return txHash;
};
