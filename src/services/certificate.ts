export type CertificateData = {
  studentName: string;
  courseName: string;
  walletAddress: string;
  issueDate: string;
  description: string;
};

export function generateCertificateMetadata(
  data: CertificateData
) {
  return {
    name: `${data.studentName} Certificate`,
    description: data.description,

    image: "ipfs://certificate-image-placeholder",

    attributes: [
      {
        trait_type: "Student Name",
        value: data.studentName,
      },
      {
        trait_type: "Course Name",
        value: data.courseName,
      },
      {
        trait_type: "Wallet Address",
        value: data.walletAddress,
      },
      {
        trait_type: "Issue Date",
        value: data.issueDate,
      },
    ],
  };
}