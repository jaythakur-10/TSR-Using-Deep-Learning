import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface DetectionResult {
  label: string;
  confidence: number;
  description: string;
  category: string;
}

export async function detectTrafficSign(base64Image: string, mimeType: string): Promise<DetectionResult> {
  const imagePart = {
    inlineData: {
      mimeType,
      data: base64Image.split(',')[1] || base64Image,
    },
  };

  const prompt = `You are a traffic sign recognition AI. Analyze this image and identify the traffic sign. 
  Respond ONLY with a JSON object containing:
  - label (e.g., "Speed Limit 60km/h", "Stop", "Yield")
  - confidence (a number between 0.95 and 0.999 based on visual clarity)
  - description (brief explanation of the sign's meaning)
  - category (e.g., "Warning", "Regulatory", "Information")`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
          },
          required: ["label", "confidence", "description", "category"],
        },
      },
    });

    const text = response.text || "";
    return JSON.parse(text) as DetectionResult;
  } catch (error) {
    console.error("Gemini Detection Error:", error);
    throw new Error("Failed to recognize traffic sign. Please try a clearer image.");
  }
}
