# CertiChain

CertiChain is a beginner-friendly Web3 dApp for minting NFT certificates on Base Sepolia with gas paid through UGF instead of ETH.

This project was built as a hackathon submission to demonstrate how onchain actions can feel simpler for everyday users. A user connects a wallet, fills in certificate details, and mints a certificate NFT without needing native gas tokens in the usual way.

## Problem Statement Fit

This project aligns with the hackathon challenge:

- Build a beginner-friendly dApp on Base Sepolia
- Use UGF so users can pay gas with Mock USD instead of ETH
- Make a real and useful onchain action work smoothly

CertiChain fits the minting track by turning certificate issuance into a gasless NFT minting experience.

## Features

- Mint NFT certificates on Base Sepolia
- Gasless transaction flow powered by UGF
- Wallet connection with MetaMask
- Live certificate preview before minting
- Base Sepolia network switch flow inside the app
- Transaction hash display with BaseScan link after minting

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Ethers.js v6
- UGF Testnet SDK
- Solidity smart contract for ERC-721 certificate minting

## How It Works

1. The user connects a wallet.
2. The app switches the wallet to Base Sepolia.
3. The user enters certificate details.
4. Metadata is generated for the NFT certificate.
5. The app creates the `mint(address,string)` calldata.
6. UGF quotes and settles the gas flow using Mock USD.
7. The NFT certificate is minted on Base Sepolia.

## Smart Contract

- Contract name: `CertificateNFT`
- Standard: ERC-721 URI Storage
- Network: Base Sepolia

Current contract behavior:

- Mints a certificate NFT to the selected wallet
- Stores token metadata URI
- Increments `nextTokenId` for each new certificate

## Project Structure

```text
src/
  app/
  components/
    certificate/
    layout/
    wallet/
  context/
  lib/
  services/
contracts/
  CertificateNFT.sol
```

## Local Setup

### Prerequisites

- Node.js 18 or later
- npm
- MetaMask or another injected EVM wallet

### Installation

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Using the App

1. Open the app in your browser.
2. Connect your wallet.
3. Switch to Base Sepolia if prompted.
4. Get Mock USD from the UGF faucet if needed.
5. Fill in the certificate form.
6. Click `Mint NFT Certificate`.
7. View the transaction on BaseScan after success.

## UGF Testnet Notes

This project uses the UGF testnet flow on Base Sepolia.

- Payment coin: `TYI_MOCK_USD`
- Faucet: `https://universalgasframework.com/faucets`
- Gateway: `https://gateway.universalgasframework.com`

The goal is to let users complete an onchain action without the usual ETH gas friction.

## Current Limitations

- Metadata is currently stored as a temporary base64 `data:` URI instead of IPFS
- Certificate issuance is open mint and not restricted to verified institutions
- There is not yet a dedicated certificate verification page
- The project currently targets hackathon demo usage on testnet

## Future Improvements

- Upload certificate metadata and artwork to IPFS
- Add issuer/admin-based access control
- Build a certificate verification portal
- Add institution branding and issuer signatures
- Improve mobile UX and transaction progress feedback
- Add indexed history for previously minted certificates

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Demo Pitch

CertiChain makes certificate minting simple, transparent, and beginner-friendly. By combining Base Sepolia with UGF, the app removes a common Web3 UX problem: needing ETH just to complete a transaction. Instead of struggling with gas setup, users can focus on the action itself.

## License

This project is licensed under the MIT License.
