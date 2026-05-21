export async function switchToBaseSepolia() {
  if (!window.ethereum) return;

  const baseSepolia = {
    chainId: "0x14A34",
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [
      "https://sepolia.base.org",
    ],
    blockExplorerUrls: [
      "https://sepolia.basescan.org",
    ],
  };

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        { chainId: baseSepolia.chainId },
      ],
    });
  } catch (switchError: unknown) {

    if (typeof switchError === "object" &&
      switchError !== null &&
      "code" in switchError &&
      switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [baseSepolia],
      });
    }
  }
}