
export interface ChatRequest {
  user_input: string;
}

export interface ChatResponse {
  status: string;
  answer: string;
  question: string;
}