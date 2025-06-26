/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileText, AlertCircle, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUploadDocumentAPI } from "../../services/paper.service";

interface DocumentViewerProps {
  paperId: number;
  paperTitle?: string;
}

export default function DocumentViewer({
  paperId,
  paperTitle,
}: Readonly<DocumentViewerProps>) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paperId) return;

    setLoading(true);
    setError(null);

    fetchUploadDocumentAPI(paperId)
      .then((response) => {
        const url = URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        setPdfUrl(url);
      })
      .catch((error) => {
        console.error("Failed to load document:", error);
        setError("Failed to load document. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paperId]);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${paperTitle || "document"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r to-purple-100 from-pink-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 truncate">
                {paperTitle || "Document"}
              </h3>
              <p className="text-xs text-gray-500">PDF Document</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {pdfUrl && (
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Loading Document
                </p>
                <p className="text-sm text-gray-500">
                  Please wait while we fetch your paper...
                </p>
              </div>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 z-10">
            <div className="text-center space-y-6 p-8 max-w-md">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-10 w-10 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Unable to Load Document
                </h3>
                <p className="text-gray-600 mb-6">{error}</p>
              </div>
            </div>
          </div>
        )}

        {pdfUrl && !loading && !error && (
          <div className="h-full relative">
            <iframe
              src={`${pdfUrl}#toolbar=0&scrollbar=0`}
              className="w-full h-full border-0 rounded-lg"
              title={paperTitle ?? "Document"}
              onError={() => setError("Failed to display PDF")}
            />

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
          </div>
        )}
      </div>
    </div>
  );
}
