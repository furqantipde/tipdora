import { GoogleGenAI } from "@google/genai";

// Safely get API key to prevent crash if process is undefined
const apiKey = (typeof process !== 'undefined' && process.env) ? (process.env.API_KEY || '') : '';

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateContent = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "API Key is missing. Please check configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, something went wrong. Please try again.";
  }
};

export const generateHashtags = async (keyword: string): Promise<string[]> => {
  const prompt = `Generate 30 trending, relevant, and high-engagement hashtags for the keyword: "${keyword}". Return only the hashtags separated by spaces. Do not number them.`;
  const result = await generateContent(prompt);
  return result.split(/\s+/).filter(tag => tag.startsWith('#'));
};

export const generateUsernames = async (keyword: string, style: string): Promise<string[]> => {
  const prompt = `Generate 20 ${style} username ideas containing or related to the word "${keyword}". Return them as a simple list separated by commas. No numbering.`;
  const result = await generateContent(prompt);
  return result.split(',').map(u => u.trim()).filter(u => u.length > 0);
};

export const generateNames = async (type: string): Promise<string[]> => {
  const prompt = `Generate 10 unique and creative random names for a ${type}. Return them as a comma-separated list.`;
  const result = await generateContent(prompt);
  return result.split(',').map(u => u.trim()).filter(u => u.length > 0);
};

export const generateTips = async (category: string): Promise<string[]> => {
  const prompt = `Provide 10 short, practical, and actionable tips about ${category}. Keep each tip under 20 words. Return as a JSON array of strings.`;
  const result = await generateContent(prompt);
  try {
    const cleaned = result.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    return result.split('\n').filter(line => line.length > 5).map(l => l.replace(/^-\s*/, ''));
  }
};

export const generateRandomWord = async (type: string): Promise<string> => {
  const prompt = `Generate a single random ${type} word. Return only the word.`;
  const result = await generateContent(prompt);
  return result.trim();
};

export const generateTextToEmoji = async (text: string): Promise<string> => {
  const prompt = `Convert the following text into a sequence of emojis that best represents it. Return ONLY the emojis: "${text}"`;
  const result = await generateContent(prompt);
  return result.trim();
};

export const generateJoke = async (topic?: string): Promise<string> => {
  const prompt = topic 
    ? `Tell me a funny, clean joke about ${topic}.` 
    : `Tell me a random funny, clean joke.`;
  const result = await generateContent(prompt);
  return result.trim();
};

export const generateTrivia = async (category: string): Promise<string> => {
  const prompt = category === 'Random' 
    ? `Tell me a random interesting trivia fact.` 
    : `Tell me an interesting trivia fact about ${category}.`;
  const result = await generateContent(prompt);
  return result.trim();
};

export const generateQuote = async (category?: string): Promise<string> => {
  const prompt = category 
    ? `Give me an inspiring quote about ${category}. Include the author.`
    : `Give me a random inspiring quote. Include the author.`;
  const result = await generateContent(prompt);
  return result.trim();
};