"use client";
import { MetaMaskSDK } from "@metamask/sdk";
import { useState } from "react";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Signoff",
  },
  injectProvider: false,
  communicationLayerPreference: "webrtc",
});

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

export default function ConnectMetaMask() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  async function connectToMetaMask() {
    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
      handleAccountsChanged(accounts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      setIsConnected(false);
      setAccount(null);
    } else if (accounts[0] !== account) {
      setIsConnected(true);
      setAccount(accounts[0]);
    }
  }

  return (
    <div>
      <button onClick={connectToMetaMask} disabled={isLoading || isConnected}>
        {isLoading ? (
          "Connecting..."
        ) : isConnected ? (
          "Connected to MetaMask"
        ) : (
          <h2 className="text-2xl font-bold text-left text-gray-150 pb-2">Connect to MetaMask</h2>
        )}
      </button>
      {isConnected && <p>Connected account: {account}</p>}
    </div>
  );
}

function requestPermissions() {
  ethereum
    .request({
      method: "wallet_requestPermissions",
      params: [{eth_accounts: {}}],
    })
    .then(permissions => {
      const accountsPermission = permissions.find(
        permission => permission.parentCapability === "eth_accounts"
      );
      if (accountsPermission) {
        console.log("eth_accounts permission successfully requested!");
      }
    })
    .catch(error => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("Permissions needed to continue.");
      } else {
        console.error(error);
      }
    });
}
