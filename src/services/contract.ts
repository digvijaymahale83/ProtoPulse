import { ethers } from "ethers";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";

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