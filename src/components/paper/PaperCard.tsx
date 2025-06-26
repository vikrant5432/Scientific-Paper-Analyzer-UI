import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import type { Paper } from "../../types/Paper";

interface PaperCardProps {
  paper: Paper;
  onClick: () => void;
}

export default function PaperCard({
  paper,
  onClick,
}: Readonly<PaperCardProps>) {
  const getStatusIcon = () => {
    switch (paper.analysis_status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (paper.analysis_status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
    >
      <div className="h-32 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center relative">
        <FileText className="h-12 w-12 text-purple-600 group-hover:scale-110 transition-transform" />
        <div className="absolute top-2 right-2">
          <div
            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}
          >
            {getStatusIcon()}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {paper.file_name}
        </h3>

        <p className="text-sm text-gray-500 mb-3 truncate">{paper.file_name}</p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(paper.upload_time)}</span>
          </div>
          <span className="capitalize font-medium">
            {paper.analysis_status.replace("_", " ")}
          </span>
        </div>
      </div>
    </div>
  );
}
