type CertificatePreviewProps = {
  formData: {
    studentName: string;
    courseName: string;
    walletAddress: string;
    issueDate: string;
    description: string;
  };
};

export default function CertificatePreview({
  formData,
}: CertificatePreviewProps) {
  return (
    <div className="flex items-center justify-center">

      <div className="w-full rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 shadow-2xl">

        <div className="rounded-3xl border border-blue-500/30 p-10">

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
            NFT Certificate
          </p>

          <h2 className="mb-8 text-4xl font-bold text-white">
            CertiChain
          </h2>

          <p className="mb-2 text-gray-400">
            This certificate is proudly presented to
          </p>

          <h1 className="mb-6 text-5xl font-extrabold text-white">
            {formData.studentName || "Student Name"}
          </h1>

          <p className="mb-2 text-gray-400">
            For successfully completing
          </p>

          <h3 className="mb-8 text-3xl font-semibold text-blue-400">
            {formData.courseName || "Course Name"}
          </h3>

          <div className="space-y-3 text-sm text-gray-300">

            <p>
              <span className="font-semibold text-white">
                Wallet:
              </span>{" "}
              {formData.walletAddress || "0x0000..."}
            </p>

            <p>
              <span className="font-semibold text-white">
                Issue Date:
              </span>{" "}
              {formData.issueDate || "YYYY-MM-DD"}
            </p>

            <p>
              <span className="font-semibold text-white">
                Description:
              </span>{" "}
              {formData.description || "Certificate description"}
            </p>

          </div>

        </div>
      </div>

    </div>
  );
}