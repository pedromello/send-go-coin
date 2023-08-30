import { MetaMaskSDK } from "@metamask/sdk";

const options = {};

const MMSDK = new MetaMaskSDK(options);

export const ethereum = window.ethereum;
