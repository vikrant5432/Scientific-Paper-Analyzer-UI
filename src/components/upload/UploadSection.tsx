// components/upload/UploadSection.tsx
import React, { useState, useRef } from "react";
import { Upload, FileText, ArrowDown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { paperUploadAPI } from "../../services/paper.service";

export default function UploadSection() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "processing" | "success"
  >("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    const fileData = new FormData();
    fileData.append("file", selectedFile);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await paperUploadAPI(fileData);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus("processing");

      // Wait a moment then navigate
      setTimeout(() => {
        if (response.data.paper_id) {
          navigate(`/papers/${response.data.paper_id}`);
        }
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("idle");
      setUploadProgress(0);
      alert("Upload failed. Please try again.");
    }
  };

  const getProgressColor = () => {
    if (uploadProgress < 30) return "from-red-500 to-red-600";
    if (uploadProgress < 70) return "from-yellow-500 to-yellow-600";
    return "from-green-500 to-green-600";
  };

  const resetUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Upload Your Research Paper to Start the Analyzer
        </h2>
        <p className="text-gray-600 text-lg">
          Get instant AI-powered insights and analysis from your scientific
          documents
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="animate-bounce">
          <ArrowDown className="h-8 w-8 text-purple-500" />
        </div>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? "border-purple-400 bg-purple-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        } ${selectedFile ? "border-green-400 bg-green-50" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploadStatus === "idle" && !selectedFile && (
          <div className="space-y-4">
            <Upload className="h-16 w-16 text-gray-400 mx-auto" />
            <div>
              <p className="text-xl font-medium text-gray-700">
                Drop your PDF here, or{" "}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  browse files
                </button>
              </p>
              <p className="text-gray-500 mt-2">Maximum file size: 50MB</p>
            </div>
          </div>
        )}

        {selectedFile && uploadStatus === "idle" && (
          <div className="space-y-4">
            <FileText className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                {selectedFile.name}
              </p>
              <p className="text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleUpload}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Start Analysis
              </button>
              <button
                onClick={resetUpload}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {uploadStatus === "uploading" && (
          <div className="space-y-4">
            <Loader2 className="h-16 w-16 text-purple-500 mx-auto animate-spin" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                Uploading your paper...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor()} transition-all duration-300`}
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {uploadProgress}% complete
              </p>
            </div>
          </div>
        )}

        {uploadStatus === "processing" && (
          <div className="space-y-4">
            <div className="relative">
              <div className="h-16 w-16 mx-auto">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-500"></div>
              </div>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Processing complete!
              </p>
              <p className="text-gray-500">Redirecting to analysis page...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
