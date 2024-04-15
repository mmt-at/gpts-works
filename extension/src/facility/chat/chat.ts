import {getOpenAIClient} from "~services/openai";

export async function getStreamOpenAI(content) {
    const openai = getOpenAIClient()
    return openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{role: 'user', content: content}],
        stream: true,
    });
}