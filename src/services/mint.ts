import { generateCertificateMetadata } from "./certificate";

type MintPayloadProps = {
  studentName: string;
  courseName: string;
  walletAddress: string;
  issueDate: string;
  description: string;
};

export async function prepareMintPayload(
  data: MintPayloadProps
) {
  const metadata =
    generateCertificateMetadata(data);

  return {
    to: data.walletAddress,

    chain: "Base Sepolia",

    metadata,

    timestamp: Date.now(),

    status: "prepared",
  };
}