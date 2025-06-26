// pages/LibraryPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import PaperCard from "../paper/PaperCard";
import { fetchPaperListAPI } from "../../services/paper.service";
import type { Paper } from "../../types/Paper";

export default function LibraryPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await fetchPaperListAPI();
      setPapers(response.data);
    } catch (error) {
      console.error("Failed to fetch papers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaperClick = (paperId: number) => {
    navigate(`/papers/${paperId}`);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Library</h1>
            <p className="text-gray-600">
              Manage and explore your research papers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-800">
              {papers.length}
            </div>
            <div className="text-sm text-gray-600">Total Papers</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {papers.filter((p) => p.analysis_status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {papers.filter((p) => p.analysis_status === "processing").length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {papers.filter((p) => p.analysis_status === "failed").length}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Loading your library...</p>
          </div>
        </div>
      ) : papers.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
            <div>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200"
              >
                Upload Paper
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          }
        >
          {papers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              onClick={() => handlePaperClick(paper.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
