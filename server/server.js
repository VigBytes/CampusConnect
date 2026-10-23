
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import { serve } from 'inngest/express'
import { inngest, functions } from './inngest/index.js'
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import storyRouter from './routes/storyRoutes.js'
import messageRouter from './routes/messageRoutes.js'

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
}))

app.use(express.json())
app.use(clerkMiddleware())
app.get('/',(req,res)=>res.send('Server is Running'))
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/story', storyRouter)
app.use('/api/message',messageRouter)

const PORT = process.env.PORT || 4000

const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(`CampusConnect server is running on port ${PORT}`)
        })
    } catch (err) {
        console.error('Failed to start server:', err.message)
        process.exit(1)
    }
}

startServer()
export default app;