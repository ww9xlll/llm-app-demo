import { Hono } from 'hono';
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

const ollama = new Hono();

const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text", // default value
    baseUrl: "http://localhost:11434", // default value
});

ollama.get('/', async (ctx) => {
    const documents = ["Hello World!", "Bye Bye"];
    const documentEmbeddings = await embeddings.embedDocuments(documents);
    return ctx.text(documentEmbeddings.toString());
});

export default ollama;