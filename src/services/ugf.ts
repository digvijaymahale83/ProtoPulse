import { UGFClient } from "@tychilabs/ugf-testnet-js";
import { ethers } from "ethers";

export const ugfClient = new UGFClient({
  baseUrl:
    "https://gateway.universalgasframework.com",
});

type GaslessPayload = {
  wallet: ethers.Signer;
  signer: ethers.Signer;
  from: string;
  contractAddress: string;
  data: string;
};

export async function sendGaslessTransaction({
  wallet,
  signer,
  from,
  contractAddress,
  data,
}: GaslessPayload) {

  try {

    console.log("UGF gasless transaction started");

    // AUTH
    await ugfClient.auth.login(wallet);

    console.log("UGF Authentication Successful");

    // QUOTE
    const quote =
      await ugfClient.quote.get({

        payment_coin: "TYI_MOCK_USD",

        payer_address: from,

        payment_chain: "84532",

        payment_chain_type: "evm",

        tx_object: JSON.stringify({
          from,
          to: contractAddress,
          data,
          value: "0",
        }),

        dest_chain_id: "84532",

        dest_chain_type: "evm",
      });

    console.log("UGF Quote:", quote);

    // PAYMENT
    await ugfClient.payment.x402.execute({
      quote,
      signer: wallet,
      token: "USDC",
    });

    console.log("UGF Payment Successful");

    // EXECUTION
    const result =
      await ugfClient.chains.evm
        .sponsorAndExecute(
          quote.digest,
          signer,
          async () => {
            return {
              to: contractAddress,
              data,
              value: 0,
            };
          }
        );

    console.log(
      "Gasless Transaction Success:",
      result
    );

    return result;

  } catch (error) {

    console.error(
      "UGF Transaction Failed:",
      error
    );

    throw error;
  }
}
