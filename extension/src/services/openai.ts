import OpenAI from "openai";

let openai: OpenAI;

export function getOpenAIClient(): OpenAI {
    if (!openai) {
        console.log("url:", process.env.PLASMO_PUBLIC_API_BASE_URL)
        console.log("supa:", process.env.PLASMO_PUBLIC_SUPABASE_URL)
        openai = new OpenAI({
            apiKey: process.env.PLASMO_PUBLIC_OPENAI_API_KEY,
            baseURL: process.env.PLASMO_PUBLIC_API_BASE_URL,
            dangerouslyAllowBrowser: true
        });
    }
    return openai;
}