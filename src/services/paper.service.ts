import backendApi from "./api.service";

export const paperUploadAPI = async (fileData: FormData) => {
  try {
    const response = await backendApi.post("/papers/upload-paper", fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Paper upload failed:", error);
    throw new Error("Paper upload failed");
  }
};

export const fetchPaperAPI = async (paperId: number) => {
  try {
    const response = await backendApi.get(`/papers/${paperId}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch paper:", error);
    throw new Error("Failed to fetch paper");
  }
};

export const fetchUploadDocumentAPI = (paperId: number) => {
  return backendApi.get(`/papers/${paperId}/view`, { responseType: "blob" });
};

export const fetchPaperListAPI = async () => {
  try {
    const response = await backendApi.get("/papers");
    return response;
  } catch (error) {
    console.error("Failed to fetch paper list:", error);
    throw new Error("Failed to fetch paper list");
  }
};
