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

    attributes: [
      {
        trait_type: "Student",
        value: data.studentName,
      },
      {
        trait_type: "Course",
        value: data.courseName,
      },
      {
        trait_type: "Issue Date",
        value: data.issueDate,
      },
    ],
  };
}