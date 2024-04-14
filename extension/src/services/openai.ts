import OpenAI from "openai";
import * as process from "process";

export function getOpenAIClient(): OpenAI {
    return new OpenAI({
            apiKey: process.env["OPENAI_API_KEY"],
            baseURL: process.env["API_BASE_URL"]
        });
}