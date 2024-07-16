import { Hono } from 'hono'
import routes from './routes/index'

const app = new Hono()

app.route('/chat', routes.chat)
app.route('/ollama', routes.ollama)

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

export default app;
