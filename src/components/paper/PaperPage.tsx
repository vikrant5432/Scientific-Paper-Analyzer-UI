import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPaperAPI } from "../../services/paper.service";
import DocumentViewer from "../Document/DocumentViewer";
import ChatInterface from "../Chat/ChatView";

interface Paper {
  id: number;
  file_name: string;
  file_size: number;
  upload_time: string;
  analysis_status: string;
  view_url: string;
}

export default function PaperPage() {
  const { paperId } = useParams<{ paperId: string }>();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await fetchPaperAPI(Number(paperId));
        setPaper(response.data);
        if (response?.data?.analysis_status !== "completed") {
          navigate("/library");
        }
      } catch (error) {
        console.error("Failed to fetch paper:", error);
      } finally {
        setLoading(false);
      }
    };

    if (paperId) {
      fetchPaper();
    }
  }, [paperId, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Paper not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-white rounded-[5px] shadow-lg overflow-hidden">
      <div className="w-1/2 border-r border-gray-200">
        <DocumentViewer paperId={paper.id} paperTitle={paper.file_name} />
      </div>

      <div className="w-1/2">
        <ChatInterface paperId={Number(paperId)} paperTitle={paper.file_name} />
      </div>
    </div>
  );
}
