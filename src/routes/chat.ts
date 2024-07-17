import { Hono } from 'hono';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatTencentHunyuan } from "@langchain/community/chat_models/tencent_hunyuan";
import { HumanMessage } from "@langchain/core/messages";

const chat = new Hono();

chat.get('/google', async (ctx) => {
    const message = ctx.req.query("message") || "Hello";
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-pro",
        maxOutputTokens: 2048,
    });
    const res = await model.invoke([["human", message,]]);
    return ctx.text(res.content as string);
});

chat.get('/hunyuan', async (ctx) => {
    const message = ctx.req.query("message") || "你好啊";
    const hunyuanPro = new ChatTencentHunyuan({
        streaming: false,
        temperature: 1,
    });
    const messages = [new HumanMessage(message)];
    let res = await hunyuanPro.invoke(messages);
    console.log(`message: ${message}, resp: ${res.content}`)
    return ctx.text(res.content as string);
});

export default chat;