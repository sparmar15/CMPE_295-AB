import React, {useState} from 'react';
import Web3Auth, {
  OPENLOGIN_NETWORK,
  LOGIN_PROVIDER,
} from '@web3auth/react-native-sdk';
import RPC from '../ethersRPC';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import {logger} from 'react-native-logs';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../Redux/Actions/UserActions';

const web3Auth = () => {
  const scheme = 'carpool://auth'; // Or your desired app redirection scheme
  const resolvedRedirectUrl = `${scheme}://openlogin`;
  const clientId =
    'BG9JhziXn3TewAdwRyUyinmvLCmC8z8h_0TIWQ25C-PSXd875e_ocLjhk8eb10-JRQZ7mVOCASXN4WLBAjo8BAY';
  const web3auth = new Web3Auth(WebBrowser, {
    clientId,
    network: OPENLOGIN_NETWORK.TESTNET, // or other networks
  });

  const dispatch = useDispatch();
  const Log = logger.createLogger();
  //   const [key, setKey] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [console, setConsole] = useState('');
  const key = useSelector(state => state.userInfo.privKey);
  const login = async () => {
    const info = await web3auth
      .login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: 'default',
        curve: 'secp256k1',
      })
      .then(res => {
        dispatch(userLogin({userInfo: res}));
        // setUserInfo(res);
        // setKey(res.privKey);
        return res;
      })
      .cathch(err => {
        Log.error(err);
      });
    return info;
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
    setConsole('Fetching balance');
    // Log.info(key.userInfo.privKey);
    const balance = await RPC.getBalance(key)
      .then(res => {
        Log.info(res);
        return res;
      })
      .catch(err => {
        Log.error(err);
      });
    return balance;
    //   return key;
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
  return {login, getBalance};
};

export default web3Auth;
