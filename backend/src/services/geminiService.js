import { GoogleGenAI } from "@google/genai";
import { envConfig } from "../config/config.js";

const ai = new GoogleGenAI({
    apiKey: envConfig.geminiApiKey
});

export default ai;