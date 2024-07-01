import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import routes from './routes/index'

const app = new Hono()

app.route('/chat', routes.chat)
app.route('/ollama-embeddings', routes.ollamaEmbeddings)

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
