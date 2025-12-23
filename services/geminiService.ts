
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
};

export const getInstantAnswer = async (question: string, category: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Question Category: ${category}\n\nQuestion: ${question}`,
      config: {
        systemInstruction: "You are SmartQ AI, a highly intelligent and helpful expert assistant. Provide concise, accurate, and insightful answers. If the category is 'Faith', provide respectful and thoughtful religious context when appropriate.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble processing your question right now. Please try again later.";
  }
};

export const streamChat = async (message: string, history: { role: 'user' | 'model', text: string }[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are SmartQ AI, a conversational partner. You help with general knowledge, school, tech, and advice. Keep the conversation engaging and helpful.",
    }
  });

  // Reconstruct history if needed (simplified for MVP as chat.sendMessage handles history in real SDK, 
  // but we'll use generateContent for simplicity in a stateless stream if needed, 
  // or use the standard chat object)
  return chat.sendMessageStream({ message });
};
