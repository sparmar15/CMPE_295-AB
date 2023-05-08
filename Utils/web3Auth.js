import Web3Auth, {
  OPENLOGIN_NETWORK,
  LOGIN_PROVIDER,
} from '@web3auth/react-native-sdk';
import RPC from '../ethersRPC';
import * as WebBrowser from '@toruslabs/react-native-web-browser';

const scheme = 'carpool://auth'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;
const clientId =
  'BG9JhziXn3TewAdwRyUyinmvLCmC8z8h_0TIWQ25C-PSXd875e_ocLjhk8eb10-JRQZ7mVOCASXN4WLBAjo8BAY';
const web3auth = new Web3Auth(WebBrowser, {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET, // or other networks
});

const login = async () => {
  try {
    const info = await web3auth.login({
      loginProvider: LOGIN_PROVIDER.GOOGLE,
      redirectUrl: resolvedRedirectUrl,
      mfaLevel: 'default',
      curve: 'secp256k1',
    });
    return info;
  } catch (e) {
    Log.info(e);
  }
};

// const getChainId = async () => {
//   setConsole('Getting chain id');
//   const networkDetails = await RPC.getChainId();
//   uiConsole(networkDetails);
// };

// const getAccounts = async () => {
//   setConsole('Getting account');
//   const address = await RPC.getAccounts(key);
//   uiConsole(address);
// };
const getBalance = async () => {
  const key = useSelector(state => state);
  Log.info('GetBalance: ' + key);
  // if (key.userInfo) {
  //   const balance = await RPC.getBalance(key.userInfo.privKey)
  //     .then(res => {
  //       Log.info(res);
  //       return res;
  //     })
  //     .catch(err => {
  //       Log.error(err);
  //     });
  //   return balance;
  // }
  return 0;
};
// const sendTransaction = async () => {
//   setConsole('Sending transaction');
//   const tx = await RPC.sendTransaction(key);
//   uiConsole(tx);
// };
// const signMessage = async () => {
//   setConsole('Signing message');
//   const message = await RPC.signMessage(key);
//   uiConsole(message);
// };

// const uiConsole = (...args) => {
//   setConsole(JSON.stringify(args || {}, null, 2) + '\n\n\n\n' + console);
// };
const logout = async () => {
  await web3auth.logout();
};

export {login, getBalance, logout};
