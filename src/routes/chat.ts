import {Hono} from 'hono';
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {MessageContent} from "@langchain/core/messages";

const chat = new Hono();

const getContent = (content: MessageContent): string => {
    if (typeof content === "string") {
        return content;
    }
    return content.toString();
};
chat.get('/', async (ctx) => {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-pro",
        maxOutputTokens: 2048,
    });
    const res = await model.invoke([
        [
            "human",
            "What would be a good company name for a company that makes colorful underwear?",
        ],
    ]);
    return ctx.text(getContent(res.content));
});

export default chat;