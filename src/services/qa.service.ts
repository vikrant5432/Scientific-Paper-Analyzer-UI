import backendApi from "./api.service";

export const fetchQuestionAnswerAPI = async (paperId: number) => {
  try {
    const response = await backendApi.get(`/paper/question-answer/${paperId}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch question answers:", error);
    throw new Error("Failed to fetch question answers");
  }
};

export const askQuestionAPI = async (paperId: number, question: string) => {
  try {
    const response = await fetch(
      `${backendApi.defaults.baseURL}/paper/question-answer/${paperId}?question=${encodeURIComponent(
        question
      )}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to ask question:", error);
    throw new Error("Failed to ask question");
  }
};
