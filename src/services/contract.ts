import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x9Cd969bC84336E2e4d8b783Ed2aCC0D7C2eeDB5E";

const ABI = [
  "function mint(address to, string tokenURI) public returns (uint256)"
];

export async function mintNFT(
  signer: ethers.Signer,
  to: string,
  tokenURI: string
) {
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    signer
  );

  const tx = await contract.mint(to, tokenURI);

  const receipt = await tx.wait();

  return {
    txHash: receipt.hash,
    receipt,
  };
}