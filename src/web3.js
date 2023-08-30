import { ethers } from "ethers";
import ERC20ABI from "./abiv2.json";

export const ethersProvider = new ethers.BrowserProvider(window.ethereum);

export let ethersSigner = await ethersProvider.getSigner();

export const ethersContract = new ethers.Contract(
  "0x39EBaE68AE22ddc7BEceA83B30799AaC2b7B1CD2",
  ERC20ABI,
  ethersSigner
);
